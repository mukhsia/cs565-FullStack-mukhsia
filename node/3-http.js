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
    if (req.url.indexOf('/redirect') === 0) {
        res.writeHead(302, {
            'Location': 'http://localhost:8080/redirected'
        });
    }

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
if (req.url.indexOf('/cache') === 0) {
    res.writeHead(302, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'max-age=86400000'
    });
    res.write('cache this resource');
}

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
    else if (req.url.indexOf('/cookie') === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': 'hello=world'
        });

        res.write('i gave you a cookie');
    }

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
    else if (req.url.indexOf('/check') === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        var packedCookie = req.headers.cookie;
        var cookies = {};

        // Parsing cookies, adapted from: https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
        packedCookie && packedCookie.split(';').forEach(function(cookie) {
            var parts = cookie.split('=');
            cookies[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        if(cookies['hello'] === 'world')
        {
            res.write('yes');
        }
        else
        {
            res.write('no');
        }
    }
    res.end();
});



console.log('server listening on port 8080');
server.listen(process.env.PORT || 8080);