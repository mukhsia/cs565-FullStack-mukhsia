'use strict';

var http = require('http'); // do not change this line

// http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/test should return 'last time you visited "/hello"' in plain text

// http://localhost:8080/world should return 'last time you visited "/test"' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/moshimoshi should return 'last time you visited "/lorem"' in plain text

// http://localhost:8080/ipsum should return 'last time you visited "/moshimoshi"' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'last time you visited "/world"' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie

var url = require("url");

var cookieIdentCount = 0;
var cookieIdents = {};
var lastUrl = {};

const server = http.createServer(function(req,res) {
    if (req.url.indexOf('/') === 0 && req.url !== '/favicon.ico') {
        var packedCookie = req.headers.cookie;
        var cookies = {};
        packedCookie && packedCookie.split(';').forEach(function(cookie) {
            var parts = cookie.split('=');
            cookies[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        if(cookies['ident'] == null || Number(cookies['ident']) > cookieIdentCount)
        {
            cookieIdentCount = cookieIdentCount + 1;
            var cookieval = 'ident=' + cookieIdentCount;
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Set-Cookie': cookieval
            });
            res.write('you must be new');
            lastUrl[cookies['ident']] = url.parse(req.url).pathname;
            res.end();
        }
        else
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain',
            });
            res.write('last time you visited ' + lastUrl[cookies['ident']]);
            lastUrl[cookies['ident']] = url.parse(req.url).pathname;
            res.end();
        }
    }
});



console.log('server listening on port 8080');
server.listen(process.env.PORT || 8080);