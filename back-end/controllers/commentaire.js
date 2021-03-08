const Commentaire = require('../models/commentaire');
const dbConn = require('../config/db.config');

// function pour crée un commentaire
    exports.postCommentaire = function(req,res){
                console.log(req.body.postId)
               
                  const commentaire ={
                    postId: req.body.postId, 
                    commentaire: req.body.commentaire ,  
                    pseudo: req.body.pseudo  , 
                    userId: req.body.userId 
                  }
                          if(!req.body){
                              res.status(400).send({message:"veuiller remplir les champ"})
                            }
                            else{
                              Commentaire.create(commentaire,(err)=>{
                                if(err){
                                res.status(500).send({message:"err"})}
                                else{
                                 res.status(201).send({message:"votre commentaire  a bien était enregistre"})
                                    }
                              })
                            }
                          }
                         // function qui affiche les commentaire de la base de donner
                          exports.getCommentaire = function(req,res){
                            console.log(req.params.id)
                              
                                          if(!req.params.id){
                                            res.status(400).send({message:"error"})
                                          }
                                          else{
                                            Commentaire.commentaireGet(req.params.id,(err,data)=> {
                                              if (err){
                                                res.status(500).send(err);
                                              }
                                                else{
                                              res.status(200).send({data});
                                                }
                                            });
                                          };
                                          
                                        }
  // function pour supprimer un commentaire 
              exports.deleteCommentaire = function(req,res){
             var objectDeleteCom = {
                   userId: req.body.userId , 
                   id: req.params.id
            }
             
                        if(!req.body.userId){
                             res.status(400).send({message:"error"})
                            }
                            else{
                                //  appel la requette sql qui va verifier si l'utilisateur est la personne qui a poster se commentaire
                                Commentaire.select(objectDeleteCom,(err,data)=>{
                                if(err){
                                   res.status(500).send({message:"erre"})
                                   }
                                     else if(data == 0 ){
                                     res.status(400).send({message:"commentaire non trouvé"})
                                      }
                                      else{ // appel la requette sql qui va supprimer le commentaire 
                                        Commentaire.delete(objectDeleteCom,(err,data)=>{
                                        if(err){res.status(500).send({message:"err"})}
                                          else{
                                         res.status(201).send({message:"commentaire supprimer"})
                                      }
                                    })
                                  }
                               })
                            }
                         }
                          
                    // function pour modifier un Commentaire 
                         exports.UpdateCommentaire = function(req,res){
                             console.log(req.body.userId)
                             console.log(req.body.commentaire)
                             const objectComment ={
                                 commentaire: req.body.commentaire 
                             }

                          Commentaire.select  = function(newEmp , result ){
                dbConn.query(`SELECT commentaire.commentaire  FROM  commentaire INNER JOIN user ON
                commentaire.userId = ${req.body.userId} WHERE id='${req.params.id}'`, newEmp, function (err, res)  {
                    if(err) { 
                         console.log("error: ", err);  result(err, null);
                        }
                        else{
                              console.log(res.UserIdCommentaire);  result(null, res.UserIdCommentaire);}
                            });
                        };
                             Commentaire.update = function(newEmp ,result){
                                dbConn.query(`UPDATE commentaire set commentaire="${req.body.commentaire}" WHERE id=${req.params.id}` ,newEmp , function(err,res){
                                     if(err){console.log("error" , err); result(err,null)}
                                     else{  result(null,res)}
                                 })
                            }
                         if(!req.body.userId){
                             res.status(400).send({mesage:"err"})
                         }
                         else{
                             Commentaire.select((err) =>{
                                 if(err){res.status(500).send({message:"err"})}
                                 else{
                                     Commentaire.update(objectComment,(err) =>{
                                         if(err){res.status(500).send({message:"err"})}
                                         else{res.status(201).send({message:"votre commentaire a bien était modifier"})}
                                        
                                     })
                                 }
                             })
                         }
                        }
                        
