const express = require('express');

const router = express.Router();

// Router Check
router.get('/router', (req, res) => {
   res.send(`<h2>Router is running!</h2>`)
})

// GET recipes
router.get('/', (req, res) => {

})

// GET recipes by id
router.get('/id', (req, res) => {

})

// POST recipes
router.post('/', (req, res) => {

})

// PUT recipes
router.put('/:id', (req, res) => {

})

// DELETE recipes
router.get('/:id', (req, res) => {

})

module.exports = router;