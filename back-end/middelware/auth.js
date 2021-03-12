const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId 
    const pseudo = decodedToken.pseudo
    const admin = decodedToken.admin 
    console.log(admin)
    console.log(pseudo)
    console.log(req.body.userId)
    
    if(admin == 1){ 
      next();
    }
    else {
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';

    } 
    
    else {
      next();
    }
  }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }

};