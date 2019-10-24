// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/recipebook.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },
    production: {
      debug: true,
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './data/migrations'
      },
      ssl: true,
      seeds: {
        directory: './data/seeds'
      },
      pool: {
        min: 2,
        max: 10
      }
    }
  }
}//[process.env.NODE_ENV || "development"]


// postgres://qcnpktmktfdhfb:e1f8f5427145494248754b9debec703dea99ce188bafda883a810bde9ae91446@ec2-54-83-33-14.compute-1.amazonaws.com:5432/ddid9ne1jafuth
