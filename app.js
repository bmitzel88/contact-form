// Import the express module
import express from 'express';

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

// Array for submittions (as theres no database)
const submittions = [];

// Define a admin route
app.get('/admin', (req, res) => {
    res.send(submittions);
});


// Start server on designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
