const dbConn = require('../config/db.config');

function User(user,) {
   
    this.email = user.email
 
    this.password = user.password

    this.pseudo = user.pseudo

   
}


User.create = function(newEmp, result) {
    dbConn.query("INSERT INTO user set ? ", newEmp, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.user);
        }
    });
}
// fonction sql pour verifier si l'utilisateur existe dans la base de donnée lors de la connexion
User.verify = function(newEmp, result) {
    dbConn.query(`SELECT * FROM user WHERE email='${newEmp.email}'`, newEmp, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);

        }

    })
}
// fonction sql pour push dans le profil l'userId

User.push = function(newEmp, result) {
    dbConn.query("INSERT INTO profil (userId , pseudo) SELECT userId , pseudo  FROM user WHERE ?", newEmp, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.profil);
        }
    })
}
//fonction sql pour supprimer l'utilisateur
User.delete = function(newEmp, result) {
    dbConn.query("DELETE FROM user WHERE ?", newEmp, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.user);
        }
    });
}


// function sql pour modifier le pseudo  dans la table user lors de la modification du profil .
User.update = function(newEmp, result) {
    dbConn.query(`UPDATE user  set pseudo='${newEmp.pseudo}'  WHERE userId= '${newEmp.userId}' `, newEmp, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.user);
            console.log(newEmp)
        }
    });
};

module.exports = User;