const dbConn = require('../config/db.config');

function Commentaire(com) {

    this.userId = com.userId,
        this.pseudo = com.pseudo,
        this.commentaire = com.commentaire

}
// function sql pour crée un commentaire 
Commentaire.create = function(newEmp, result) {

    dbConn.query("INSERT INTO  commentaire  set ? ", newEmp, function(err, res) {

     if(err){
         result(err,null)
     }
    
         else {
            console.log(newEmp.commentaire)
            result(null, res);
        }
    });
};


// function sql pour modifier le profil 
Commentaire.updatePseudo = function(newEmp, result) {

    dbConn.query(`UPDATE commentaire  SET pseudo='${newEmp.pseudo}'  WHERE userId='${newEmp.userId}'`, newEmp, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            console.log(newEmp.pseudo)
        } else {
            console.log(res);
            result(null, res);
        }
    });
};
// function sql qui recupere le commentaire selectionner dans la bd via son id
Commentaire.commentaireGet = function(newEmp, result) {
    dbConn.query(`SELECT * FROM commentaire  WHERE postId=${newEmp}`, newEmp, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res);
        }
    });
};

// requette sql qui va verifier dans la base de donner si l'userId de l'utilisateur corespont a celui du commentaire 
Commentaire.select = function(newEmp, result) {
    dbConn.query(`SELECT commentaire.commentaire  FROM  commentaire INNER JOIN user ON
                                    commentaire.userId = ${newEmp.userId} WHERE id='${newEmp.id}'`, newEmp, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.UserIdCommentaire);
            result(null, res);
        }
    });
};

// requette sql pour supprimer  TOUT les commentaire du post
Commentaire.deleteCommentaire = function(newEmp, result) {
    dbConn.query(`DELETE FROM commentaire WHERE postId='${newEmp.id}'`, function(err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}
// requette sql pour supprimer le commentaire selectionner 
Commentaire.delete = function(newEmp, result) {
    dbConn.query(`DELETE FROM commentaire WHERE id='${newEmp.id}'`, function(err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}
// requette sql pour supprimer tout les commentaire poster par l'utilisateur 
Commentaire.deleteAllCommentaire = function(newEmp, result) {
    dbConn.query(`DELETE FROM commentaire WHERE userId='${newEmp.userId}'`, function(err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}
// requette sql pour modifer le commentaire selectionner 
Commentaire.update = function(newEmp, result) {
    dbConn.query(`UPDATE commentaire set commentaire="${newEmp.commentaire}" WHERE id=${newEmp.id}`, newEmp, function(err, res) {
        if (err) {
            console.log("error", err);
            result(err, null)
        } else {
            result(null, res)
        }
    })
}


module.exports = Commentaire;