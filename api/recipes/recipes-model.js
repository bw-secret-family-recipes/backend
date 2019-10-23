const db = require('../../data/dbConfig');

module.exports = {
   find,
   findRecipeById,
   add,
   update,
   remove
};

function find() {
   return db('recipes')
}

function findRecipeById(id) {
   return db('recipes').where({ id }).first()
}

function add(recipe) {
   return db('recipes')
      .insert(recipe)
      .then(ids => {
         return findRecipeById(ids[0]);
      })
}

function update(id, changes) {
   return db('recipes').where({ id }).update(changes)
      .then(recipe => {
         return findRecipeById(id)
      })
}

function remove(id) {
   return db('recipes')
      .where({ id })
      .del()
}