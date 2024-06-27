// create a web server
const express = require('express');
const app = express();

// enable POST request
app.use(express.json());

// enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// create a comments array
const comments = [];

// create a POST request
app.post('/comments', (req, res) => {
    // get the body from the request
    const body = req.body;
    // add the body to the comments array
    comments.push(body);
    // return the body to the client
    res.json(body);
});

// create a GET request
app.get('/comments', (req, res) => {
    // return the comments array to the client
    res.json(comments);
});

// start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});