const express = require('express')
const router = express.Router()
const userController =  require('../controllers/user');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/pushid', userController.pushUserIdProfil);
router.delete('/deleteuser', auth , multer, userController.deleteUser);


module.exports = router ; 