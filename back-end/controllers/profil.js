const Profil = require('../models/profil');
const User = require('../models/user');
const dbConn = require('../config/db.config');
const Post = require('../models/post');
const Commentaire = require('../models/commentaire')

 // function pour crée un profil par default a l'inscription
exports.CreateProfil = function(req ,res , next ){
  const profil = new Profil({ pseudo: req.body.pseudo})  
    if(!req.body.pseudo){
        res.status(400).json({message:""})
    }
    else{
        Profil.create(profil,(err,data)=>{
    if(err)
    res.status(500).send({
      message:
      err.message || ""
     });
    else{ 
       res.status(201).send(profil)
      }
    })
   }
 }

// function pour recuperer le profil 
  exports.getOneProfilUnique = function(req,res){
   
   // function sql pour recupérer un profil de la base de données ; 
    Profil.getOneProfil = function( newEmp ,result){
        dbConn.query("SELECT * FROM profil WHERE userId=" + req.params.id , newEmp ,   function(err,res){
            if(err){
                console.log("error: " , err); result(err,null);
            }
            else{
                console.log(res.insertId)  , result(null, res.insertId );
               
            }
        })
    }
      if(!req.params.id){
         return res.status(400).json({message:"ere"})
      }
      else{
    Profil.getOneProfil(function(err,data){  
      if(err){
      res.status(400).json({message:""})
    }
      else{ 
          res.status(200).json({data})
             }
          })
        }
     }

  exports.updateProfil =  function(req ,res , next ){

    const profilObject =  req.file ?
{
  ...JSON.parse(req.body.profil) ,
  imageProfil:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : JSON.parse(req.body.profil) 

console.log(profilObject.imageProfil)

      // function sql pour modifier le profil  
      Profil.update = function(newEmp , result ){
        dbConn.query(`UPDATE profil  SET pseudo='${profilObject.pseudo}' , imageProfil='${profilObject.imageProfil}' , first_Name='${profilObject.firstName}', last_Name='${profilObject.lastName}' WHERE userId='${req.params.id}'` , newEmp, function (err, res)  {
            if(err) { 
                 console.log("error: ", err);  result(err, null);
                }
                else{
                      console.log(res.insertId);  result(null, res.insertId);}
                    });
                };
                // function sql pour modifier le pseudo  dans la table user.
                User.update = function(newEmp , result){ 
                   dbConn.query(`UPDATE user  set pseudo='${profilObject.pseudo}'  WHERE userId= '${req.params.id}' `, newEmp , function(err,res){ 
                      if(err) { 
                           console.log("error: ", err);  result(err, null);
                          }
                          else{
                                console.log(res.insertId);  result(null, res.user);
                              }
                              });
                          };
                          // function sql pour modifier le pseudo dans la table post 
                          Post.update = function(newEmp , result ){
                            dbConn.query(`UPDATE post  set pseudo='${profilObject.pseudo}'  WHERE userId= '${req.params.id}' ` , newEmp, function (err, res)  {
                                if(err) { 
                                     console.log("error: ", err);  result(err, null);
                                    }
                                    else{
                                          console.log(res.insertId);  result(null, res.user);
                                        }
                                       });
                                    };
                                    // function sql pour modifier le pseudo dans les commentaire 
                                    Commentaire.update = function(newEmp , result ){
                                      dbConn.query(`UPDATE commentaire  set pseudo='${profilObject.pseudo}'  WHERE userId= '${req.params.id}' ` , newEmp, function (err, res)  {
                                          if(err) { 
                                               console.log("error: ", err);  result(err, null);
                                              }
                                              else{
                                                    console.log(res.insertId);  result(null, res.user);
                                                  }
                                                 });
                                              };
                                       if(!req.body){
                                        res.status(400).json({message:"le fichier n'est pas accepter"})
                                       }
                                         else{
                                               Profil.update(function(err,data){
                                         if(err){res.status(500).send({message:"err"})}
                                            else{ 
                                                  User.update(profilObject.pseudo,(err,data)=>{
                                                   if(err){res.status(500).send({message:"err"})}
                                                   else{
                                                         Post.update(profilObject.pseudo,(err,data)=>{
                                                         if(err){res.status(500).send({message:"err"})}
                                                         else{
                                                           Commentaire.update(profilObject.pseudo,(err,data)=>{
                                                             if(err){res.status(500).send({message:"err"})}
                                                             else{
                                                               res.status(201).json(profilObject.pseudo)
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
