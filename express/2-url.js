'use strict';

var express = require('express'); // do not change this line

// http://localhost:8080/ should return 'you have accessed the root' in plain text
const server = express();

server.use(function(req, res, next) {
    next();
});

//See example in slide...
server.get('/', function(req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/plain'
    });
    res.write('you have accessed the root')
    res.end();
})

server.

server.listen(process.env.PORT || 8080);

// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text

// http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>hello</td><td>world</td></tr>
//         <tr><td>lorem</td><td>ipsum</td></tr>
//       </table>
//     </body>
//   </html>

// http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>first</td><td>1</td></tr>
//         <tr><td>second</td><td>2</td></tr>
//         <tr><td>third</td><td>3</td></tr>
//       </table>
//     </body>
//   </html>