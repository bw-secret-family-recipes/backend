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
  },

  production: {
    debug: true,
    client: 'pg',
    connection: 'postgres://robhbglcczgytm:5771f2a36931ec604ffa8291f4a829836787354be5a2bf76698108a88b86a54e@ec2-54-243-239-199.compute-1.amazonaws.com:5432/d7nb3hlr0jgsf9?ssl=true',
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


//[process.env.NODE_ENV || "development"]

