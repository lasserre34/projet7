const express = require('express')
const multer = require('../middelware/multer');
const router = express.Router()
const postController =  require('../controllers/post');
const auth = require('../middelware/auth');

router.get('/get/forum/:id',auth ,multer , postController.getOnePost)
router.post('/post',auth, multer , postController.createPost );
router.get('/post/forum'  , multer  , postController.getPost);
router.delete('/post/delete/:id',auth, multer, postController.deletepost );

module.exports = router ; 