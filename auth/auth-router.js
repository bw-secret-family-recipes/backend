const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secrets')

const Users = require('./auth-model');

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

router.get('/:id', (req, res) => {
   const { id } = req.params;

   Users.findRecipeById(id)
      .then(data => {
         console.log(data)
         if (data) {
            res.json(data);
         } else {
            res.status(404).json({ message: 'Could not find user with specified ID.' })
         }
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to get user' });
      });
})

router.post("/register", (req, res) => {
   const { username, password } = req.body;

   if (!username || !password) {
      res.status(400).json({
         message: "Server Error: Failed to create new user"
      });
   } else {
      req.body.password = bcrypt.hashSync(req.body.password, 12);

      Users.add(req.body)
         .then(account => {
            res.status(201).json({ account, message: 'Welcome!' });
         })
         .catch(err => {
            res.status(500).json({
               err: "There was an error while saving the user to the database"
            });
         });
   }
});

router.post('/login', (req, res) => {
   Users.findByUsername(req.body.username)
      .first()
      .then(user => {
         if (user && bcrypt.compareSync(req.body.password, user.password)) {
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
      username: user.username,
      subject: user.id,
   };
   const options = {
      expiresIn: '1d'
   }
   return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
