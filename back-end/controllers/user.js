const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const Profil = require('../models/profil');
const Commentaire = require('../models/commentaire');

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
              
          
            if(data == 0) {
               res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            data.forEach(element => {
                
        
            bcrypt.compare(req.body.password, element.password)
              .then(valid => {
                if(!valid) {
                   res.status(400).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    data,
                  userId: data.userId,
                  
                  token: jwt.sign({
                     userId: element.userId,
                     pseudo: element.pseudo,
                      admin: element.admin},
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
    const deleteUserObject = req.body.userId
    const deleteUser = {

        userId: deleteUserObject
    }

 
    if (!req.body) {
        res.status(400).send({
            message: ""
        })
    } else {
        // appel la fonction pour supprimer l'utilisateur de la base de donnée
        User.delete(deleteUser, (err, data) => {
            if (err){
                res.status(500).send({messgae:"errUser" });
            }
            else { // appel la fonction pour supprimer tout les post de l'utilisateur 
                Post.deleteAllposte(deleteUser,(err,data)=>{
                  if(err){
                     res.status(500).send({message:"errPost"})
                  }
                  else{ // appel la fonction pour supprimer le profil de l'utilisateur 
                      Profil.delete(deleteUser,(err,data)=>{
                          if(err){
                              res.status(500).send({message:"errProfil"})
                          }
                          else{ // appel la fonction pour supprimer tout les commentaire de l'utilisateur
                              Commentaire.deleteAllCommentaire(deleteUser,(err,data)=>{
                                  if(err){
                                      res.status(500).send({message:"errCommentaire"})
                                  }
                                  else{
                                      res.status(200).send({message:"vos données personnel sont supprimer"})
                                  }
                              })
                          }
                      })
                  }
                })
            
            }
        })
    }
}