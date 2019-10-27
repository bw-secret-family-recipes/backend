const db = require('../../data/dbConfig');

module.exports = {
   find,
   findRecipeById,
   add,
   update,
   remove,
   findUserById,
   findUsers,
   findIngredientsByRecipe
};

function find() {
   return db('recipes')
}

function findUsers() {
   return db('users')
}

function findRecipeById(id) {
   return db('recipes').where({ id }).first()
}

function findIngredientsByRecipe(recipe_id) {
   return db('ingredients')
      .join('recipes', 'recipes.id', 'ingredients.recipe_id')
      .where({ recipe_id: recipe_id })
      .select('recipe_name', 'ingredient_name')
}

function findUserById(id) {
   return db('users').where({ id }).first()
}

function add(recipe) {
   return db('recipes')
      .insert(recipe, 'id')
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