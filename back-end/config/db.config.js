'use strict';
const mysql = require('mysql');
// connexion db mysql locale
const dbConn = mysql.createConnection ({
  hôte: 'localhost',
 user: 'projet7',
  password : 'brindille34',
   database: 'sql7'
});

dbConn.connect(function(err) { 
     if (err) throw err; 
      console.log("Database Connected!");
    });
    module.exports = dbConn;