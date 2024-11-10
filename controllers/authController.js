const bcrypt = require('bcryptjs');
const db = require('../models/db');

// Registration logic
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userCheckQuery = 'SELECT * FROM users WHERE email = ?';
    const [results] = await db.query(userCheckQuery, [email]); // No need for .promise()

    if (results.length > 0) {
      return res.status(400).send('User with this email already exists');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    await db.query(insertUserQuery, [username, email, hashedPassword]); // No need for .promise()

    console.log('User registered successfully');
    res.redirect('/auth/login'); // Redirect to login page after successful registration
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('An error occurred');
  }
};

// Login logic
// Login logic
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const userCheckQuery = 'SELECT * FROM users WHERE email = ?';
    const [results] = await db.query(userCheckQuery, [email]); // Using await and db.query()

    if (results.length === 0) {
      return res.status(400).send('Invalid email or password');
    }

    const user = results[0];

    // Compare the password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Set the userId in the session for authentication purposes
    req.session.userId = user.id;

    // Successful login
    console.log('User logged in successfully:', user.id);
    res.redirect('/recipes/dashboard'); // Redirect to the dashboard after successful login
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('An error occurred');
  }
};

// Logout logic
exports.logout = (req, res) => {
  // Clear the session or token (depending on how you handle authentication)
  req.session.destroy(() => {
    console.log('User logged out successfully');
    res.redirect('/auth/login'); // Redirect to login page after logout
  });
};
