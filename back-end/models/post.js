const dbConn = require('../config/db.config');

function Post(post){
  
    this.file = post.file ,  
    this.commentaire = post.commentaire , 
    this.pseudo = post.pseudo
    this.userId = post.userId 
   
     
}
// requette sql pour crée un post 
Post.create = function(newEmp , result ){
    dbConn.query("INSERT INTO post  set ? ", newEmp, function (err, res)  {         
        if(err) { 
             console.log("error: ", err);  result(err, null);
            }
            else{
                  console.log(res.insertId);  result(null, res.insertId);}
                });
            };
// requette sql pour recupperer tout les post de la base de données
            Post.getAllPost = function(result){
                dbConn.query("SELECT * FROM post" ,  function (err,res){
                    if(err){
                        console.log("error: " , err); result(err,null);
                    }
                    else{
                        console.log(res); 
                        result(null, res );
                       
                    }
                })
            }
// requette sql pour récuperer le compte des commentaire par post 
    Post.getAllCommentaire = function(result){
        dbConn.query(`SELECT post.id , COUNT(commentaire.id) AS nb_commentaire FROM commentaire
         RIGHT JOIN post ON commentaire.postId = post.id GROUP BY post.id ` , function(err,res){
             if(err){console.log("error" , err); result(err,null)}
             else{  result(null,res)}
         })
    }

      // requette sql pour modifier le pseudo dans la table post lors de la modification du profil 
      Post.update = function(newEmp , result ){
        dbConn.query(`UPDATE post  set pseudo='${newEmp.pseudo}'  WHERE userId='${newEmp.userId}' ` , newEmp, function (err, res)  {
            if(err) { 
                 console.log("error: ", err);  result(err, null);
                }
                else{
                      console.log(res.insertId);  result(null, res);
                      console.log(newEmp.pseudo)
                    }
                   });
                };
 // requette sql qui affiche le post selectionner via son id dans la Bd
                Post.getOnePost = function(newEmp , result){
                
                    dbConn.query(`SELECT * FROM post  WHERE id='${newEmp}'`  , newEmp, function (err, res)  {
                      if(err) { 
                          console.log(newEmp)
                           console.log("error: ", err);  result(err, null);
                          }
                          else{
                                console.log(res.insertId);  result(null, res);
                            console.log(newEmp)
                            console.log(newEmp)
                        }
                              });
                          };
              // requette sql qui va verifier si 'luserId envoyer corespont au POST selectionner
                          Post.select  = function(newEmp , result ){
                            dbConn.query(`SELECT post.file  FROM  post INNER JOIN user ON
                            post.userId = ${newEmp.userId} WHERE id='${newEmp.id}'`, newEmp, function (err, res)  {
                                if(err) { 
                                     console.log("error: ", err);  result(err, null);
                                    }
                                    else{
                                          console.log(res.UserIdPost);  result(null, res);}
                                        });
                                    };
                                    // requette sql qui supprime le post selectionner via son id si la verification de l'userId du post est bonne
                                    Post.delete = function(newEmp, result){
                                        dbConn.query(`DELETE FROM post WHERE id='${newEmp.id}'` , newEmp, function(err,res)  {
                                            if(err) { 
                                                 console.log("error: ", err);  result(err, null);
                                                }
                                                else{
                                                      console.log(res.UserIdPost);  result(null, res);}
                                                    });
                                                };
    
module.exports = Post ; 