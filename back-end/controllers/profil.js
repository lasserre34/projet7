const Profil = require('../models/profil');
const User = require('../models/user');
const dbConn = require('../config/db.config');
const Post = require('../models/post');
const Commentaire = require('../models/commentaire');
const fs = require('fs') ; 
// function pour crée un profil par default a l'inscription
exports.CreateProfil = function(req, res, next) {
    const profil = new Profil({
        pseudo: req.body.pseudo
    })
    if (!req.body.pseudo) {
        res.status(400).json({
            message: ""
        })
    } else {
        Profil.create(profil, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || ""
                });
            else {
                res.status(201).send(profil)
            }
        })
    }
}

// function pour recuperer le profil 
exports.getOneProfilUnique = function(req, res) {
    var reqParamsId = req.params.id


    if (!req.params.id) {
        return res.status(400).json({
            message: "ere"
        })
    } else {
        Profil.getOneProfil(reqParamsId, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: ""
                })
            } else {
                res.status(200).json({
                    data
                })

                console.log(req.params.id)
                console.log(data)

            }
        })
    }
}
// recupere le profil de l'utilisateur qui a poster le gif 

exports.getOneProfilUser = function(req, res) {
    var reqParamsId = req.params.id


    if (!req.params.id) {
        return res.status(400).json({
            message: "ere"
        })
    } else {
        Profil.getOneProfil(reqParamsId, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: ""
                })
            } else {
                res.status(200).json({
                    data
                })

                console.log(req.params.id)
                console.log(data)

            }
        })
    }
}
exports.updateProfil = function(req, res, next) {

    const profilObject = req.file ? {
        ...JSON.parse(req.body.profil),
        userId: req.params.id,
        imageProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : JSON.parse(req.body.profil)

    if (!req.body) {
        res.status(400).json({
            message: "le fichier n'est pas accepter"
        })
    } else {
        // appel la requette sql qui va modifier les elements modifier dans la table profil
        Profil.update(profilObject, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "errProfil"
                })
            } else {
                //appel la requette sql qui va modifier le pseudo de la table user(si le pseudo est modifier) 
                User.update(profilObject, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: "errUser"
                        })
                    } else {
                        // appel la requette sql qui va modifier le pseudo de la table post(si le pseudo est modifier)
                        Post.update(profilObject, (err, data) => {
                            if (err) {
                                res.status(500).send({
                                    message: "errPost"
                                })
                            } else {
                                // appel la requette sql qui va modifer le pseudo de la table Commentaire(si le pseudo est modifier)
                                Commentaire.updatePseudo(profilObject, (err, data) => {
                                    if (err) {
                                        res.status(500).send({
                                            message: "errCommentaire"
                                        })
                                    } else {
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