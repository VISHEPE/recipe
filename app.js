const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const homeRoutes = require('./routes/homeRoutes');
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

// Use routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/', homeRoutes);


// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
