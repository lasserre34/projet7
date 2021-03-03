const express = require('express')
const multer = require('../middelware/multer');
const router = express.Router()
const postController =  require('../controllers/post');
const auth = require('../middelware/auth');

router.get('/get/forum/:id',auth ,multer , postController.getOnePost)
router.post('/post',auth, multer , postController.createPost );
router.get('/post/forum'  , multer  , postController.getPost);
router.get('/post/forum/:id' ,auth, multer , postController.getCommentaire);
router.post('/post/postcommentaire' ,auth, multer ,  postController.postCommentaire);
router.delete('/post/delete/:id',auth, multer, postController.deletepost )
module.exports = router ; 