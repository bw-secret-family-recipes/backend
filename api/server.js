const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const AuthRouter = require('./users/auth-router');
const RecipesRouter = require('./recipes/recipes-router');

const server = express();

server.use(express.json());
server.use(cors())
server.use(helmet());
server.use(logger('dev'));

// Router
server.use('/api/auth', AuthRouter);
server.use('/api/recipes', RecipesRouter);

// Server Check
server.get('/server', (req, res) => {
   res.send(`<h2>Server is running!</h2>`)
})

module.exports = server;
