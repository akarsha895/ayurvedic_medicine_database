const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();



// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Default to localhost if not specified
    user: process.env.DB_USER, // Use environment variable for username
    password: process.env.DB_PASSWORD, // Use environment variable for password
    database: process.env.DB_NAME || 'ayurvedic_database' // Use environment variable for database name
    
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Export the database connection for use in other modules
module.exports = db;
