const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const RecipesRouter = require('../data/recipes/recipes-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

// Router
server.use('/api/recipes', RecipesRouter);

// Server Check
server.get('/server', (req, res) => {
   res.send(`<h2>Server is running!</h2>`)
})

module.exports = server;
