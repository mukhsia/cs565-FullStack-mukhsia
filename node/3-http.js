'use strict';

var http = require('http'); // do not change this line

const server = http.createServer(function(req,res) {


// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text
if (req.url.indexOf('/missing') === 0) {
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });

    res.write('your princess is in another castle');
}
// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
else if (req.url.indexOf('/cookie') === 0) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': 'hello=world'
    });

    res.write('<!DOCTYPE html><html><body>set cookie exercise, expects \'hello = world\' cookie</body></html>');
}

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
else if (req.url.indexOf('/check') === 0) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    if(req.headers.cookie != null && req.headers.cookie['hello'] != null)
    {
        res.write('yes');
    }
    res.write('no');
}
});

console.log('server listening on port 8080');
server.listen(process.env.PORT || 8080);