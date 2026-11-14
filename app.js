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


// Define a admin route
app.get('/admin', async(req, res) => {
    
    try {
        const [submissions] = await pool.query('SELECT * FROM submissions ORDER BY timestamp DESC');
        res.render('admin', {submissions});
    } catch(err) {
        console.error('Database error ', err);
        res.status(500).send('Database error occurred.')
    }
});

app.post('/submit-form', async(req, res) => {
    const submission = req.body;
    submission.timestamp = new Date();

    // Define SQL query to INSERT the new submission
    const sql = `INSERT INTO submissions (fname, lname, jtitle, company, linkedin, email, meetMethod, meetMethodOther, message, mailingList, mailMethod)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Create an array of perameters from submission data
    const params = [
        submission.fname,
        submission.lname,
        submission.jtitle,
        submission.company,
        submission.lkedIn,
        submission.email,
        submission['meet-method'],
        submission['meet-method-other'],
        submission.message,
        submission['mailing-list'] === 'on' ? 1 : 0, // turn it into an integer
        submission.method
    ];

    // Execute the query
    const [result] = await pool.execute(sql, params);

    // Get the ID from the newly inserted row
    submission.id = result.insertId;
    console.log("A new row was inserted with ID " + submission.id);
    
    //Display the confirmation page
    res.render('confirm', { submission });
});


// Start server on designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
