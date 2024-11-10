const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes with the auth middleware
router.get('/dashboard', authMiddleware, recipeController.getAllRecipes);
router.post('/add', authMiddleware, recipeController.addRecipe);
router.post('/edit/:id', authMiddleware, recipeController.editRecipe);
router.post('/delete/:id', authMiddleware, recipeController.deleteRecipe);

module.exports = router;
