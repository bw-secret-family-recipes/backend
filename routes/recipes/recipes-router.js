const express = require('express');

const Recipes = require('./recipes-model');
const restricted = require('../../auth/middleware/restricted-middleware');

const router = express.Router();

// Router Check
router.get('/router', (req, res) => {
   res.send(`<h2>Router is running!</h2>`)
})

// GET recipes
router.get('/', (req, res) => {
   Recipes.find()
      .then(data => {
         res.status(200).json(data);
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to get recipes' })
      })
})

// GET recipes by id
router.get('/:id', restricted, (req, res) => {
   const { id } = req.params;

   Recipes.findRecipeById(id)
      .then(data => {
         console.log(data)
         if (data) {
            res.json(data);
         } else {
            res.status(404).json({ message: 'Could not find user with specified ID.' })
         }
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to get user' });
      });
})

// GET recipe ingredients by recipe id
router.get('/:id/ingredients', restricted, (req, res) => {
   const { id } = req.params;

   Recipes.findIngredientsByRecipe(id)
      .then(ingredients => {
         console.log(ingredients)
         if (ingredients) {
            res.json(ingredients);
         } else {
            res.status(404).json({ message: 'Could not find user with specified ID.' })
         }
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to get ingredients' });
      });
})

// POST a new recipe
router.post('/', (req, res) => {
   const { id } = req.params;
   const recipe = req.body;
   console.log(recipe);

   Recipes.add(recipe)
      .then(data => {
         res.status(201).json(data);
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to create new recipe' })
      })
})

// PUT a recipe
router.put('/:id', restricted, validateRecipeId, (req, res) => {
   const { id } = req.params;
   const changes = req.body;

   Recipes.update(id, changes)
      .then(changes => {
         if (changes) {
            console.log(changes)
            res.status(200).json(changes)
         } else {
            res.status(404).json({ message: 'Could not find recipe with provided recipe ID' })
         }
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to update recipe' })
      })
})

// DELETE a recipe
router.delete('/:id', restricted, validateRecipeId, (req, res) => {
   const { id } = req.params;

   Recipes.remove(id)
      .then(count => {
         if (count > 0) {
            res.status(200).json({ message: 'Recipe successfully deleted' });
         } else {
            res.status(404).json({ message: 'Recipe not found' });
         }
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: 'Server Error: Failed to delete recipe' })
      })
})

// Middleware - Validate Recipe ID
function validateRecipeId(req, res, next) {
   const { id } = req.params;

   Recipes.findRecipeById(id)
      .then(data => {
         if (data) {
            req.data = data;
            next();
         } else {
            res.status(400).json({ message: 'Recipe ID not validated' })
         }
      })
      .catch(err => {
         res.status(500).json({ message: 'Server Error' })
      })
}

module.exports = router;