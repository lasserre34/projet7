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


         

//


module.exports = Profil ; 