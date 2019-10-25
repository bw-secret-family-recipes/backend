const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('./config/secrets')

const Users = require('../users/users-model');

router.get('/', (req, res) => {
   res.send('<h1>Auth Router Working</h1>')
})

router.get('/users', (req, res) => {
   Users.find()
      .then(users => {
         res.json(users);
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to get users' });
      });
});

router.post('/register', (req, res) => {
   const user = req.body;

   const hash = bcrypt.hashSync(user.password, 10);
   user.password = hash;

   Users.add(user)
      .then(saved => {
         res.status(201).json({ message: 'Account successfully created!' })
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to create new user' })
      })
});

router.post('/login', (req, res) => {
   const { username, password } = req.body;

   Users.findByUsername(username)
      .first()
      .then(user => {
         if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)

            res.status(200).json({
               message: `Welcome ${user.username}!`,
               token
            });
         } else {
            res.status(401).json({ message: 'Invalid Credentials' });
         }
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to login user' });
      });
});

function generateToken(user) {
   const payload = {
      sub: user.id,
      username: user.username
   }
   const options = {
      expiresIn: '1d'
   }
   return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
