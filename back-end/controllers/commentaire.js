const Commentaire = require('../models/commentaire');
const dbConn = require('../config/db.config');

const { body, validationResult } = require('express-validator');

// function pour crée un commentaire
exports.postCommentaire = function(req, res) {
    console.log(req.body.postId)

    const commentaire = {
        postId: req.body.postId,
        commentaire: req.body.commentaire,
        pseudo: req.body.pseudo,
        userId: req.body.userId
    }
    
    if (!req.body.commentaire) {
        res.status(400).send({
            message: "veuiller remplir les champ"
        })
    } else {
        Commentaire.create(commentaire, (err) => {
            if (err) {
                res.status(500).send({
                    message: "err"
                })
            } else {
                res.status(201).send({
                    message: "votre commentaire  a bien était enregistre"
                })
            }
        })
    }
}
// function qui affiche les commentaire de la base de donner
exports.getCommentaire = function(req, res) {
    console.log(req.params.id)

    if (!req.params.id) {
        res.status(400).send({
            message: "error"
        })
    } else {
        Commentaire.commentaireGet(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    data
                });
            }
        });
    };

}
// function pour supprimer un commentaire 
exports.deleteCommentaire = function(req, res) {
    var objectDeleteCom = {
        userId: req.body.userId,
        id: req.params.id
    }

    if (!req.body.userId) {
        res.status(400).send({
            message: "error"
        })
    } else {
        //  appel la requette sql qui va verifier si l'utilisateur est la personne qui a poster se commentaire
        Commentaire.select(objectDeleteCom, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "erre"
                })
            } else if (data == 0) {
                res.status(400).send({
                    message: "commentaire non trouvé"
                })
            } else { // appel la requette sql qui va supprimer le commentaire 
                Commentaire.delete(objectDeleteCom, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: "err"
                        })
                    } else {
                        res.status(201).send({
                            message: "commentaire supprimer"
                        })
                    }
                })
            }
        })
    }
}

// function pour modifier un Commentaire 
exports.UpdateCommentaire = function(req, res) {

    const objectComment = {
        commentaire: req.body.commentaire,
        userId: req.body.userId,
        id: req.params.id
    }
    if (!req.body.userId || !req.body.commentaire) {
        res.status(400).send({
            mesage: "err"
        })
    } else {
        // appel la requette sql qui va verifier si l'utilisateur est selui qui a poster le commentaire 
        Commentaire.select(objectComment, (err) => {
            if (err) {
                res.status(500).send({
                    message: "err"
                })
            } else {
                // appel la requette sql qui pour modifer le commentaire 
                Commentaire.update(objectComment, (err) => {
                    if (err) {
                        res.status(500).send({
                            message: "err"
                        })
                    } else {
                        res.status(201).send({
                            message: "votre commentaire a bien était modifier"
                        })
                    }
                })
            }
        })
    }
}