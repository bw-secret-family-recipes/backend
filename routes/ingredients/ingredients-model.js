const db = require('../../data/dbConfig');

module.exports = {
     find,
     add,
     update,
     remove,
     findIngredientById,
     findRecipeById
};

function find() {
     return db('ingredients')
}

function findIngredientById(id) {
     return db('ingredients').where({ id }).first()
}

function add(ingredient) {
     return db('ingredients')
          .insert(ingredient, 'id')
          .then(ids => {
               return findIngredientById(ids[0]);
          })
}

function findRecipeById(id) {
     return db('recipes').where({ id }).first()
}

function update(id, changes) {
     return db('ingredients').where({ id }).update(changes)
          .then(ingredient => {
               return findRecipeById(id)
          })
}

function remove(id) {
     return db('ingredients')
          .where({ id })
          .del()
}