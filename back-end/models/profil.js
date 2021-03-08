const dbConn = require('../config/db.config');
// Shema des données du profil
function Profil(profil){
    this.userId = profil.userId 
    this.id = profil.id
    this.first_Name = profil.first_Name , 
    this.last_Name = profil.last_Name , 
    this.description = profil.description , 
    this.imageProfil = profil.imageProfil ,
    this.pseudo = profil.pseudo 

}


// function SQL pour ajouter un profil dans la base de données
Profil.create = function(newEmp , result){
    dbConn.query("INSERT INTO profil  set ?", newEmp, function (err, res)  {
        if(err) { 
             console.log("error: ", err);  result(err, null);
            }
            else{
                  console.log(res.insertId);  result(null, res.insertId);}
                });
            };
// function sql pour recupere le  profil  de l'utilisateur via son id
            Profil.getOneProfil = function( newEmp ,result){
                dbConn.query("SELECT * FROM profil WHERE userId=?" , newEmp ,   function(err,res){
                    if(err){
                        console.log("error: " , err); result(err,null);
                    }
                    else{
                         result(null, res );
                         
                       
                    }
                })
            }
         // function sql pour modifier le profil 
            Profil.update = function(newEmp , result ){
              
                dbConn.query(`UPDATE profil  SET pseudo='${newEmp.pseudo}' , imageProfil='${newEmp.imageProfil}' , first_Name='${newEmp.firstName}', last_Name='${newEmp.lastName}' WHERE userId='${newEmp.userId}'` , newEmp, function (err, res)  {
                    if(err) { 
                         console.log("error: ", err);  result(err, null);
                         console.log(newEmp.pseudo)
                        }
                        else{
                              console.log(res.insertId);  result(null, res.insertId);}
                           
                           
                             
                            });
                        };



module.exports = Profil ; 