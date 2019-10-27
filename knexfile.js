// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/database.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: '.data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    }
  },

  testing: {
    client: 'sqlite3',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: {
      host: 'localhost',
      user: 'thirty',
      password: 'thirty',
      database: 'thirtytest'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_ENV,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ssl: true,
    seeds: {
      directory: './data/seeds'
    }
  }
};
