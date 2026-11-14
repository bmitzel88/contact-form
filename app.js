// Import the express module
import express from 'express';

// Import mysql
import mysql2 from 'mysql2';

// Import .env
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool for sql
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Create an instance
const app = express();

// Define a port number
const PORT = 3002;

// Enable static file serving
app.use(express.static('public'));

//Allow access of form data from req.body
app.use(express.urlencoded({extended: true}));
//set view engine to ejs
app.set('view engine', 'ejs');

// Define a default route ("/")
app.get('/', (req, res) =>{
    res.render(`home`);
});

// Array for submissions (as theres no database)
const submissions = [];

// Define a admin route
app.get('/admin', (req, res) => {
    res.send(submissions);
});

app.post('/submit-form', (req, res) => {
    const submission = req.body;
    submission.timestamp = new Date();
    submissions.push(submission)
    console.log(submission);
    res.render('confirm', {submission});
});


// Start server on designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
