const db = require('../data/dbConfig');

module.exports = {
   find,
   addUser,
   findByUsername,
   findById,
   findBy,
   add
};

function find() {
   return db('users')
}

function findByUsername(username) {
   return db('users').where({ username }).first();
}

function findById(id) {
   return db('users')
      .where({ id })
      .first();
}

function findBy(filter) {
   return db('users').where(filter);
}

function addUser(user) {
   return db("users")
      .insert(user, "id")
      .then(ids => {
         const [id] = ids;
         return findById(id);
      });
}

function add(resource) {
   return db("users").insert(resource).then(ids => {
      return db('users').where({ id: ids[0] }).first();
   });
}