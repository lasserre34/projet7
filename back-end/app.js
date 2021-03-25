const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();
const mysql = require('mysql');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const expressSanitizer = require('express-sanitizer');
const dotenv = require('dotenv').config() ; 

app.use(express.json());
app.use(expressSanitizer());

const userRoute = require("./routes/user");
const profilRoute = require("./routes/profil");
const postRoute = require('./routes/post');
const commentaireRoute = require('./routes/commentaire');

const db = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`
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
  

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000 ,
    max: 1000
  })
  const limiterLogin = rateLimit({
    windowMs: 15 * 60 * 1000 ,
    max: 500 
  })
  
  app.use(helmet()) ; 
  app.use(limiter);
  
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true })) ; 
  



  

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/auth' ,limiterLogin, userRoute);
  app.use('/api' , profilRoute);
  app.use('/api',  postRoute );
  app.use('/api', commentaireRoute);

module.exports = app ;