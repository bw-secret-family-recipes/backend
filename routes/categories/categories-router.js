const express = require('express');

const Categories = require('./categories-model');
const restricted = require('../../auth/middleware/restricted-middleware');

const router = express.Router();

// Router Check
router.get('/router', (req, res) => {
     res.send(`<h2>Router is running!</h2>`)
})

// GET Categories
router.get('/', (req, res) => {
     Categories.find()
          .then(data => {
               res.status(200).json(data);
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({ message: 'Server Error: Failed to get Categories' })
          })
})


// GET Categories by id
router.get('/:id', restricted, (req, res) => {
     const { id } = req.params;

     Categories.findIngredientById(id)
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

// POST a new category
router.post('/', (req, res) => {
     const { id } = req.params;
     const category = req.body;
     console.log(category);

     Categories.add(category)
          .then(data => {
               res.status(201).json(data);
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({ message: 'Server Error: Failed to create new category' })
          })
})

// PUT a category
router.put('/:id', restricted, validateRecipeId, (req, res) => {
     const { id } = req.params;
     const changes = req.body;

     Categories.update(id, changes)
          .then(changes => {
               if (changes) {
                    console.log(changes)
                    res.status(200).json(changes)
               } else {
                    res.status(404).json({ message: 'Could not find category with provided category ID' })
               }
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({ message: 'Server Error: Failed to update category' })
          })
})

// DELETE a category
router.delete('/:id', restricted, validateRecipeId, (req, res) => {
     const { id } = req.params;

     Categories.remove(id)
          .then(count => {
               if (count > 0) {
                    res.status(200).json({ message: 'category successfully deleted' });
               } else {
                    res.status(404).json({ message: 'category not found' });
               }
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({ message: 'Server Error: Failed to delete category' })
          })
})

// Middleware - Validate Recipe ID
function validateRecipeId(req, res, next) {
     const { id } = req.params;

     Categories.findIngredientById(id)
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