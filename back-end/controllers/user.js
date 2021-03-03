const User = require('../models/user');
const dbConn = require('../config/db.config');
const jwt = require('jsonwebtoken');

/*  inscription */
exports.signup = function(req, res, next) {
  const user = new User({
    email: req.body.email, 
    password: req.body.password , 
    pseudo: req.body.pseudo 
     })
   // function sql  qui  enregistre les données dans de l'inscription dans la BDD 
     User.create = function (newEmp, result) {
    dbConn.query ("INSERT INTO user set ? "  , newEmp, function (err, res)  {
        if(err) { 
             console.log("error: ", err);  result(err, null);
            }
            else{
                  console.log(res.insertId);  result(null, res.user);}
                });
            }

    if(!req.body.email || !req.body.password){
          res.status(400).send(
              { error:true, message: 'Please provide all required field' });
            }  
            
           else{
              User.create(user,(err,data) =>{
                if(err)
                res.status(500).send({
                  message: 
                  err.message  || ""
                });
                else if(data == 0){
                  res.status(400).send({message:"veuiller remplir tout les champs "})
                }
              
                else{
                  console.log(data)
                  res.status(201).send(user)
                
                   }
               }) 
           }
        }
        // fonction lors de l'inscription qui crée un profil par default 
        exports.pushUserIdProfil = function(req,res){
          const pushPseudo ={
           pseudo: req.body.pseudo 
          }
         
         User.push(pushPseudo,(err,data)=>{
              if(err)
              res.status(500).send({
                message:err.message || ""
              });
              else{  
                res.status(201).send({data})
              }
            })
          } 
          /* Connexion */
           exports.login = function(req, res){
             const user = {
               email:req.body.email 
                  }
             if(!req.body.password || !req.body.email){
                res.status(400).send(
                  {error:true, message: "tout les champs sont requis" } 
                )
             }
              else{
                // verifie si l'email est dans la base de donnée
                User.verify(user,(err,data) =>{
                  if(err)
                  res.status(500).send({
                    message: 
                    err.message  || ""
                  });
                  else if(data == 0){
                    res.status(400).send({message:" Cette utilisateur n'existe pas dans la base de données"})
                  }
                  else{
                  data.forEach(element => {
                    console.log(element.userId)
                    res.status(200).json({data ,
                      token: jwt.sign(
                        {userId: element.userId,
                         email: element.email},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                      )
                    })
                  });
                  
               }
                })
              }
            }

         //fonction sql qui supprimera l'utilisateur 
         exports.deleteUser = function(req,res){
         const deleteUserObject = JSON.parse(req.body.userDelete)
         const deleteUser ={

           userId: deleteUserObject.userId
         }
        
        User.delete= function(newEmp , result){ 
         dbConn.query ("DELETE FROM user WHERE ?"  , newEmp, function (err, res)  {
          if(err) { 
               console.log("error: ", err);  result(err, null);
              }
              else{
                    console.log(res.insertId);  result(null, res.user);}
                  });
              }
            

           if(!req.body){
             res.status(400).send({message:""})
           }
           else{
         User.delete(deleteUser,(err,data)=>{
          if(err)
          res.status(500).send({
            message:err.message || ""
          });
          else{  
            res.status(200).send({message:"l'utilisateur a était supprimer de la base de données"})
          }
        })
      } 
    }    
                
    