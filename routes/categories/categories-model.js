const db = require('../../data/dbConfig');

module.exports = {
     find,
     add,
     update,
     remove,
     findCategoryById
};

function find() {
     return db('categories')
}

function findCategoryById(id) {
     return db('categories').where({ id }).first()
}

function add(category) {
     return db('categories')
          .insert(category, 'id')
          .then(ids => {
               return findIngredientById(ids[0]);
          })
}

// function update(id, changes) {
//      return db('categories').where({ id }).update(changes)
//           .then(category => {
//                return findRecipeById(id)
//           })
// }

function remove(id) {
     return db('categories')
          .where({ id })
          .del()
}