const fs = require('fs'); // file system package

// create a http request handler (getting messages from port and forward it here)
const requestHandler = (req, res) => {
    // geting url from message
    const url = req.url;
    // getting method GET/POST from message
    const method = req.method;

    // check the URL 
    if (url === '/') {
        // return plain HTML code for now, it will be write to the socket and then flushed to the client
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');

        // we ready to send
        return res.end();
    }
    
    // check the URL
    if (url === '/message' && method === 'POST') {
        // read by chunks (it will be working as a channel, we will work with some data as it being parsed) in async mode
        const body = [];

        // handler for reading data
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });

        // handler for the end of file
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';