const express = require('express')
const router = express.Router()
const profilController =  require('../controllers/profil');
const multer = require('../middelware/multer');
const auth = require('../middelware/auth');

router.post('/profil',auth, multer , profilController.CreateProfil);
router.get('/profil/getprofil/:id',auth, multer , profilController.getOneProfilUnique );
router.put('/updateprofil/:id' ,auth, multer ,  profilController.updateProfil);
router.get('/profil/getprofiluser/:id',auth , multer ,profilController.getOneProfilUser);

module.exports = router ;  