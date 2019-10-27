const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const AuthRouter = require('../auth/auth-router');
const RecipesRouter = require('../routes/recipes/recipes-router');
const IngredientsRouter = require('../routes/ingredients/ingredients-router');

const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

// Router
server.use('/api/auth', AuthRouter);
server.use('/api/recipes', RecipesRouter);
server.use('/api/ingredients', IngredientsRouter);

// Server Check
server.get('/', (req, res) => {
   res.send(`<h2>Server is working!</h2>`)
})

module.exports = server;
