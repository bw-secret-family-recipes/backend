const express = require('express');

const router = express.Router();

// Router Check
router.get('/router', (req, res) => {
   res.send(`<h2>Router is running!</h2>`)
})

module.exports = router;