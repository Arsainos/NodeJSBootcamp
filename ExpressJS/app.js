const http = require('http');

const express = require('express');

const app = express();

// add middleware
app.use((req, res, next) => {
    console.log('In middleware!');
    next(); // allows to continue to the next middleware
}); 

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from node.js!</h1>');
});

const server = http.createServer(app);

server.listen(3000);