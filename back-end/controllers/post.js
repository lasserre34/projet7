const Post = require('../models/post');
const dbConn = require('../config/db.config');
const Commentaire = require('../models/commentaire');
const fs = require('fs') ; 

// création d'un post 
exports.createPost = function(req, res, next) {

    const post = new Post({
        file: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        pseudo: req.body.pseudo,
        userId: req.body.userId
    })

    console.log(post)
    if (!req.file) {
        res.status(400).send({
            message: "Ajouter un fichier a partager"
        })
    } else {
        Post.create(post, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || ""
                })
            } else {
                res.status(201).send({
                    data
                })

            }
        })
    }
}
// renvoie tout les post de la Bd
exports.getPost = function(req, res) {
    Post.getAllPost(function(err, post) {
        if (err) {
            res.status(500).send(err)
        } else {
            Post.getAllCommentaire(function(err, com) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send({
                        post,
                        com
                    })
                }
            })
        }
    });
};
// function qui affiche le post selectionner via son id
exports.getOnePost = function(req, res) {

    if (!req.params.id) {
        res.status(500).send({
            message: "err"
        })
    } else {
        Post.getOnePost(req.params.id, (err, data) => {
            if (err) {
                res.status(400).send({
                    message: "err"
                })
            } else {
                res.status(200).send(data)
            }
        })
    }
}
// function pour supprimer le post 
exports.deletepost = function(req, res) {

    var objectDelete = {
        userId: req.body.userId,
        id: req.params.id
    }
    if (!req.body.userId) {
        res.status(400).send({
            message: "error"
        })
    } else {
        // apele la requete sql qui va verifier si l'userId de l'utilisateur correspont a celui du post
        Post.select(objectDelete, (err, data) => {
            
            if (err) {
                res.status(500).send({
                    message: "erre"
                })
            } else if (data == 0) {
                res.status(400).send({
                    message: "commentaire non trouvé"
                })
            } else {  Post.getOnePost(req.params.id,(err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: "err"
                        })
                    } 
                    
                    else{ 
                       data.forEach(element => {
                           
                        const filename = element.file.split('/images/')[1]; 
                        
                        fs.unlink(`images/${filename}` , () =>{ console.log("image supprimeé")})
                      
                       });
                   
                    // apele la requette sql qui va supprimer le post
                Post.delete(objectDelete, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: "err"
                        })
                    } else { // apele la requette sql qui va supprimer les commentaire
                        Commentaire.deleteCommentaire(objectDelete, (err) => {
                            if (err) {
                                res.status(500).send({
                                    message: "err"
                                })
                            } else {
                                res.status(201).send({
                                    message: "votre post a bien etait supprimer"
                                })
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
 

