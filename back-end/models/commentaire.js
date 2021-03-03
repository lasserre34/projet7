const dbConn = require('../config/db.config');

function Commentaire(com){
     
    this.userId = com.userId , 
    this.pseudo = com.pseudo , 
    this.commentaire = com.commentaire 
    
   
     
}


module.exports = Commentaire ; 