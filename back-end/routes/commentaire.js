const express = require('express')
const multer = require('../middelware/multer');
const router = express.Router();
const commentaireController = require('../controllers/commentaire');
const auth = require('../middelware/auth');


router.delete('/post/commentaire/delete/:id' , auth ,  multer , commentaireController.deleteCommentaire);
router.put('/post/commentaire/update/:id' , auth , multer , commentaireController.UpdateCommentaire );
router.post('/post/commentaire' ,auth, multer ,  commentaireController.postCommentaire);
router.get('/post/commentaire/:id' ,auth, multer , commentaireController.getCommentaire);
module.exports = router ; 