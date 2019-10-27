const express = require('express');

const Ingredients = require('./ingredients-model');
const restricted = require('../../auth/middleware/restricted-middleware');

const router = express.Router();

// Router Check
router.get('/router', (req, res) => {
     res.send(`<h2>Router is running!</h2>`)
})

// GET Ingredients
router.get('/', (req, res) => {
     Ingredients.find()
          .then(data => {
               res.status(200).json(data);
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({ message: 'Server Error: Failed to get Ingredients' })
          })
})


// GET Ingredients by id
router.get('/:id', restricted, (req, res) => {
     const { id } = req.params;

     Ingredients.findIngredientById(id)
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

// POST a new ingredient
router.post('/', (req, res) => {
     const { id } = req.params;
     const ingredient = req.body;
     console.log(ingredient);

     Ingredients.add(ingredient)
          .then(data => {
               console.log(data);
               res.status(201).json(data);
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({ message: 'Server Error: Failed to create new ingredient' })
          })
})

// PUT Ingredient
router.put('/:id', validateRecipeId, (req, res) => {
     const { id } = req.params;
     const changes = req.body;

     Ingredients.update(id, changes)
          .then(changes => {
               if (changes) {
                    console.log(changes)
                    res.status(200).json(changes)
               } else {
                    res.status(404).json({ message: 'Could not find ingredient ID' })
               }
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({ message: 'Server Error: Failed to update ingredient' })
          })
})

// DELETE a ingredient
router.delete('/:id', restricted, validateRecipeId, (req, res) => {
     const { id } = req.params;

     Ingredients.remove(id)
          .then(count => {
               if (count > 0) {
                    res.status(200).json({ message: 'ingredient successfully deleted' });
               } else {
                    res.status(404).json({ message: 'ingredient not found' });
               }
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({ message: 'Server Error: Failed to delete ingredient' })
          })
})

// Middleware - Validate Recipe ID
function validateRecipeId(req, res, next) {
     const { id } = req.params;

     Ingredients.findIngredientById(id)
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