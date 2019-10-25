// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('./config/secrets')

// const Users = require('./users-model');

module.exports = (req, res, next) => {
   const token = req.headers.authorization;

   if (token) {
      jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
         if (err) {
            res.status(401).json({ message: 'Not verified' })
         } else {
            req.decodedToken = decodedToken;
            next();
         }
      })
   } else {
      res.status(400).json({ message: 'No token provided' })
   }
}