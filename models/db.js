const mysql = require('mysql2/promise');

// MySQL Database Connection using a Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '12345678', // Replace with your MySQL password
    database: 'recipe_app' // Replace with your database name
});

// No need to call `db.connect()` when using a pool
module.exports = db;
