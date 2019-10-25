const db = require('../../data/dbConfig');

module.exports = {
   find,
   findBy,
   findById,
   findByUsername,
   add,
   update,
   remove
};

function find() {
   return db('users')
}

function findBy(filter) {
   return db('users').where(filter);
}

function findById(id) {
   return db('users').where({ id }).first();
}

function findByUsername(username) {
   return db('users').where({ username }).first();
}

function add(user) {
   return db('users').insert(user, 'id')
      .then(ids => {
         const [id] = ids;
         return findById(id);
      });
}

function update(id, changes) {
   return db('users').where({ id }).update(changes)
      .then(user => {
         return findById(id);
      })
}

function remove() {
   return db('users').where({ id }).del()
}