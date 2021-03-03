const express = require('express')
const multer = require('../middelware/multer');
const router = express.Router();
const commentaireController = require('../controllers/commentaire');
const auth = require('../middelware/auth');

router.post('/post/commentaire' ,auth, commentaireController.postUserIdCommentaire); 
router.delete('/post/commentaire/delete/:id' , auth ,  multer , commentaireController.deleteCommentaire);
module.exports = router ; 