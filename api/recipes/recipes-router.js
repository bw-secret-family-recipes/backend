const express = require('express');

const Recipes = require('./recipes-model');
// ADD RESTRICTED

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
router.get('/id', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.get('/:id', (req, res) => {
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

module.exports = router;