const Commentaire = require('../models/commentaire');
const dbConn = require('../config/db.config');


exports.postUserIdCommentaire = function(req,res){
    const UserIdCommentaire = {
         userId: req.body.userId
    }
    Commentaire.create = function(newEmp , result ){
        dbConn.query("INSERT INTO  commentaire  set ? ", newEmp, function (err, res)  {
            if(err) { 
                 console.log("error: ", err);  result(err, null);
                }
                else{
                      console.log(res.UserIdCommentaire);  result(null, res.UserIdCommentaire);}
                    });
                };
                if(!req.body.userId){
                    res.status(400).send({message:"err"})
                }
                else{
                    Commentaire.create(UserIdCommentaire,(err,data)=>{
                        if(err){
                            res.status(500).send({message:"err"})
                        }
                        else{
                            res.status(201).json({data})
                        }
                    })
                }
            }

            exports.deleteCommentaire = function(req,res){
              
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
                            Commentaire.delete = function(newEmp, result){
                            dbConn.query(`DELETE FROM commentaire WHERE id='${req.params.id}'` , newEmp, function(err,res)  {
                                if(err) { 
                                     console.log("error: ", err);  result(err, null);
                                    }
                                    else{
                                          console.log(res.UserIdCommentaire);  result(null, res.UserIdCommentaire);}
                                        });
                                    };
                            if(!req.body.userId){
                                res.status(400).send({message:"error"})
                            }
                            else{
                                Commentaire.select((err,data)=>{
                               if(err){
                                   res.status(500).send({message:"erre"})
                               }
                               else if(data == 0 ){
                                   res.status(400).send({message:"commentaire non trouvé"})
                               }
                               else{
                                  Commentaire.delete((err,data)=>{
                                      if(err){res.status(500).send({message:"err"})}
                                      else{
                                          res.status(201).send({message:"commentaire supprimer"})
                                      }
                                  })
                                  }
                                })
                            }
                         }