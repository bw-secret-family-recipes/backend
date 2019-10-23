const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  return knex('users').truncate()
    .then(() => {
      return knex('users').insert([
        { first_name: 'first', last_name: 'last', username: 'user1', password: bcrypt.hashSync('pass', 10), email: 'user1@user1.com' },
      ]);
    })
};