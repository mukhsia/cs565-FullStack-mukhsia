'use strict';

var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line

// http://localhost:8080/ should return 'you have accessed the root' in plain text
var server = http.createServer(function(req, res) {
    if(req.url === "/") {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
    
        res.write('you have accessed the root');
    } 
 



// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

    else if (req.url.indexOf('/test/hello') === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.write('hello');
    }

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text
    else if (req.url.indexOf('/test/world') === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.write('world');
    }


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
    else if (req.url.indexOf('/attributes') === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        // in-class tip: https://stackoverflow.com/questions/8590042/parsing-query-string-in-node-js
    }
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


    res.end();
});
console.log('server listening on port 8080');
server.listen(process.env.PORT || 8080);