const knex = require('knex');

const config = require('../knexfile');

// module.exports = knex(config.development);

const dbEnv = process.env.DB_ENV || 'development';
module.exports = knex(config[dbEnv]);