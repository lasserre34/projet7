const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const { body, validationResult } = require('express-validator');

/*  inscription */
exports.signup = function(req, res, next) {
  bcrypt.hash(req.body.password ,10 )
  .then( hash => {
    const user = new User({
        email: req.body.email,
        password: hash,
        pseudo: req.body.pseudo
    })
  
    // function sql  qui  enregistre les données dans de l'inscription dans la BDD 

    if (!req.body.password || !req.body.email || !req.body.pseudo) {
        res.status(400).send({
            error: true,
            message: 'veuiller remplir tout les champs'
        });
    } else {
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || ""
                });
              else {
                console.log(data)
                res.status(201).send(user)

            }
          })
       }
    })
  .catch(error => res.status(500).send({error}))
}
// fonction lors de l'inscription qui crée un profil par default 
exports.pushUserIdProfil = function(req, res) {
    const pushPseudo = {
        pseudo: req.body.pseudo
    }
  
   if(!req.body.pseudo){
       res.status(400).send({message:"veuiller remplir tout les champs"})
   }
   else{
    User.push(pushPseudo, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || ""
            });
        else {
            res.status(201).send({
                data
            })
        }
    })
  }
}
/* Connexion */
exports.login = function(req, res) {
    const user = {
        email: req.body.email  
       
    }
        // verifie si l'email est dans la base de donnée
        User.verify(user,(err,data)=>{

            if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            data.forEach(element => {
                
        
            bcrypt.compare(req.body.password, element.password)
              .then(valid => {
                if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    data,
                  userId: data.userId,
                  
                  token: jwt.sign({
                     userId: element.userId },
                     `${process.env.TOKEN}` ,
                     { expiresIn: '24h' }
                    
                  ) 
                });
        })
              })
             
          })
        
          
      };

             

//fonction sql qui supprimera l'utilisateur 
exports.deleteUser = function(req, res) {
    const deleteUserObject = JSON.parse(req.body.userDelete)
    const deleteUser = {

        userId: deleteUserObject.userId
    }


    if (!req.body) {
        res.status(400).send({
            message: ""
        })
    } else {
        User.delete(deleteUser, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || ""
                });
            else {
                res.status(200).send({
                    message: "l'utilisateur a était supprimer de la base de données"
                })
            }
        })
    }
}