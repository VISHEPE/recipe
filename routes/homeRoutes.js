const express = require('express');
const db = require('../models/db'); // Updated to the promise-based client
const router = express.Router();

// Home route
router.get('/', async (req, res) => {
  try {
    // Query the database to fetch some sample recipes
    const [results] = await db.query('SELECT * FROM recipes LIMIT 5'); // No need for `promise()`

    // Render the index page and pass the recipes as data
    res.render('index', { recipes: results });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
