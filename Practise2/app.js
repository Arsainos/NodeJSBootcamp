const http = require('http');

const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('In middleware');
    next();
});

app.use('/users', (req, res, next) => {
    console.log('in users middleware');
    res.send('<ul><li>User 1</li></ul>');
});

app.use('/', (req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>Hello from node.js server!</h1>');
})

const server = http.createServer(app);

server.listen(3000);