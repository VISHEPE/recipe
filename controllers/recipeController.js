const db = require('../models/db');

// Get all recipes
// Fetch all recipes for the logged-in user
exports.getAllRecipes = async (req, res) => {
  try {
    const userId = req.session.userId; // Get the logged-in user's ID from the session
    const query = 'SELECT * FROM recipes WHERE user_id = ?';
    const [recipes] = await db.query(query, [userId]); // Fetch recipes for this user

    // Render the dashboard and pass the user's recipes to the template
    res.render('dashboard', { recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Server error');
  }
};


// Add a new recipe
exports.addRecipe = (req, res) => {
  const { title, ingredients, instructions, category } = req.body;
  const userId = req.session.userId; // Get the logged-in user's ID from the session

  if (!userId) {
    return res.status(401).send('Unauthorized'); // Check if the user is authenticated
  }

  // Insert the new recipe into the database, linked to the user
  const query = 'INSERT INTO recipes (user_id, title, ingredients, instructions, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [userId, title, ingredients, instructions, category], (err, result) => {
    if (err) {
      console.error('Error adding recipe to the database:', err);
      return res.status(500).send('Server error');
    }

    console.log('Recipe added successfully:', result);
    res.redirect('/recipes/dashboard'); // Redirect to the dashboard after adding the recipe
  });
};


// Edit an existing recipe
exports.editRecipe = (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, category } = req.body;

  // Update the recipe in the database
  const query = 'UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, category = ? WHERE id = ?';
  db.query(query, [title, ingredients, instructions, category, id], (err, result) => {
    if (err) {
      console.error('Error updating recipe in the database:', err);
      return res.status(500).send('Server error');
    }

    console.log('Recipe updated successfully:', result);
    res.redirect('/recipes/dashboard'); // Redirect to the dashboard after updating the recipe
  });
};

// Delete a recipe
exports.deleteRecipe = (req, res) => {
  const { id } = req.params;

  // Delete the recipe from the database
  const query = 'DELETE FROM recipes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting recipe from the database:', err);
      return res.status(500).send('Server error');
    }

    console.log('Recipe deleted successfully:', result);
    res.redirect('/recipes/dashboard'); // Redirect to the dashboard after deleting the recipe
  });
};
