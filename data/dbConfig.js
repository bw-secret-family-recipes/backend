const knex = require('knex');

const config = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'development';
module.exports = knex(config[dbEnv]);

// const dbEnv = process.env.DB_ENV || 'development';

// module.exports = knex(config.development);
// module.exports = knex(config);


// const environment = process.env.ENVIRONMENT || 'development'
// const config = require('../knexfile.js')[environment];
// module.exports = ('knex')(config);
