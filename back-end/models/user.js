const dbConn = require('../config/db.config');

 function User(user){
    
    this.email = user.email , 
    this.password = user.password  
    this.pseudo = user.pseudo 
 }


          
           
            User.verify = function( newEmp , result) {
                dbConn.query ("SELECT * FROM user WHERE ?" , newEmp, function (err, res) {
                    if(err){
                        console.log("error: ", err); result(err, null); 
                    }
                    else{
                        console.log(res); result(null, res);
                        
                    }
                    
                })
            }
            // fonction sql pour push dans le profil l'userId

            User.push = function(newEmp , result){
                dbConn.query("INSERT INTO profil (userId , pseudo) SELECT userId , pseudo  FROM user WHERE ?"  , newEmp, function ( err , res){
                    if(err){
                        console.log("error: ", err); result(err, null);
                    }
                    else{
                        console.log(res.insertId); result(null, res.profil);
                    }
                })
            }

            
                
          

module.exports = User ; 

