'use strict'; 

const Post = require('../models/post');
const dbConn = require('../config/db.config');
const Commentaire = require('../models/commentaire');


exports.createPost = function (req,res,next){
   
    const post = new Post({
       file:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}` , 
        pseudo: req.body.pseudo ,  
        userId: req.body.userId
       })
     
    console.log(post)
    if(!req.file ){
        res.status(400).send({message:"Ajouter un fichier a partager"})
      }
    else{
        Post.create(post,(err,data)=>{
    if(err){
    res.status(500).send({
      message:
      err.message || ""
    }) 
  }

    else{ 
        res.status(201).send({data})
       
       }
     })
   }
 }

   exports.getPost = function(req,res){ /* renvoi tou le post de la base de donées*/
    Post.getAllPost(function(err,post) {
        if (err){
          res.status(500).send(err)}
          else{
        res.status(200).send({post});
          }
      });
    };
   

  exports.postCommentaire = function(req,res){
   const objectCommentaire = JSON.parse(req.body.commentaire)
  
    const commentaire ={
      postId: objectCommentaire.postId , 
      commentaire: objectCommentaire.commentaire ,  
      pseudo: objectCommentaire.pseudo  , 
      userId: objectCommentaire.userId 
    }
 
    Post.commentaire = function(newEmp , result ){
      dbConn.query("INSERT INTO commentaire set ?", newEmp, function (err, res)  {
          if(err) { 
               console.log("error: ", err);  result(err, null);
              }
              else{
                    console.log(res.insertId);  result(null, res.insertId);}
                  });
              };
              if(!req.body){
                res.status(400).send({message:"veuiller remplir les champ"})
              }
              else{
                Post.commentaire(commentaire,(err,data)=>{
                  if(err)
                  res.status(500).send({message:"err"})
                  else{
                    res.status(201).send({message:"votre commentaire a bien était enregistrer"})
                  }
                })
              }
            }
 ////////////////////////////////////////////////////////////////////////
 exports.getOnePost = function(req,res){
   Post.getOnePost = function(newEmp , result){
    dbConn.query("SELECT * FROM post  WHERE id=" + req.params.id , newEmp, function (err, res)  {
      if(err) { 
           console.log("error: ", err);  result(err, null);
          }
          else{
                console.log(res.insertId);  result(null, res.post);}
              });
          };
          if(!req.params.id){
            res.status(500).send({message:"err"})
          }
          else{
            Post.getOnePost(function(err,data){
            if(err){
              res.status(400).send({message:"err"})
            }
            else{
              res.status(200).send(data)
            }
        })
      }
   }
 
   exports.getCommentaire = function(req,res){
console.log(req.params.id)
    Post.commentaireGet = function(newEmp , result ){
      dbConn.query("SELECT * FROM commentaire  WHERE postId=" + req.params.id , newEmp, function (err, res)  {
          if(err) { 
               console.log("error: ", err);  result(err, null);
              }
              else{
                    console.log(res.insertId);  result(null, res.insertId);}
                  });
              };
              if(!req.params.id){
                res.status(400).send({message:"error"})
              }
              else{
                Post.commentaireGet(function(err,data) {
                  if (err)
                    res.status(500).send(err);
                    else{
                  res.status(200).send({data});
                    }
                });
              };
              
            }

            exports.deletepost = function(req,res){
             
              Post.select  = function(newEmp , result ){
                  dbConn.query(`SELECT post.file  FROM  post INNER JOIN user ON
                  post.userId = ${req.body.userId} WHERE id='${req.params.id}'`, newEmp, function (err, res)  {
                      if(err) { 
                           console.log("error: ", err);  result(err, null);
                          }
                          else{
                                console.log(res.UserIdPost);  result(null, res.UserIdPost);}
                              });
                          };
                          Post.delete = function(newEmp, result){
                          dbConn.query(`DELETE FROM post WHERE id='${req.params.id}'` , newEmp, function(err,res)  {
                              if(err) { 
                                   console.log("error: ", err);  result(err, null);
                                  }
                                  else{
                                        console.log(res.UserIdPost);  result(null, res.UserIdPost);}
                                      });
                                  };
                          if(!req.body.userId){
                              res.status(400).send({message:"error"})
                          }
                          else{
                              Post.select((err,data)=>{
                             if(err){
                                 res.status(500).send({message:"erre"})
                             }
                             else if(data == 0 ){
                                 res.status(400).send({message:"commentaire non trouvé"})
                             }
                             else{
                                Post.delete((err,data)=>{
                                    if(err){res.status(500).send({message:"err"})}
                                    else{
                                        res.status(201).send({message:"commentaire supprimer"})
                                    }
                                })
                                }
                              })
                          }
                       }