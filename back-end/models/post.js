const dbConn = require('../config/db.config');

function Post(post){
  
    this.file = post.file ,  
    this.commentaire = post.commentaire , 
    this.pseudo = post.pseudo
    this.userId = post.userId 
   
     
}

Post.create = function(newEmp , result ){
    dbConn.query("INSERT INTO post  set ? ", newEmp, function (err, res)  {         
        if(err) { 
             console.log("error: ", err);  result(err, null);
            }
            else{
                  console.log(res.insertId);  result(null, res.insertId);}
                });
            };

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

 

module.exports = Post ; 