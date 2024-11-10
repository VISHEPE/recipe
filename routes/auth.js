const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', login);

router.get('/logout', logout);

module.exports = router;
