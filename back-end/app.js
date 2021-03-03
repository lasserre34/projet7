const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();
const mysql = require('mysql');
const multer = require('multer');


const userRoute = require("./routes/user");
const profilRoute = require("./routes/profil");
const postRoute = require('./routes/post');
const commentaireRoute = require('./routes/commentaire');

const db = mysql.createConnection({
    host: "localhost",
    user: "projet7",
    password: "brindille34"
})
db.connect(function(err) {

    if (err) throw err;
 
    console.log("Connecté à la base de données MySQL!");
 
  });
  

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true })) ; 
  



  

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/auth' , userRoute);
  app.use('/api' , profilRoute);
  app.use('/api',  postRoute );
  app.use('/api', commentaireRoute);

module.exports = app ;