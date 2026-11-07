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


// Start server on designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
