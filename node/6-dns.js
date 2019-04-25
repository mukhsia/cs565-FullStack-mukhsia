'use strict';

var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line


var server = http.createServer(function(req, res) {

// http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text (address might be different, there could even be multiple addresses)
// Use dns resolve (resolve4)
// dnsPromises ?

// http://localhost:8080/sniklaus.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text (addresses / order might be different)

// http://localhost:8080/error should return 'error' in plain text
    // req.url doesn't work because we still have /, maybe remove 'localhost:8080'
    dns.resolve(req.url, function(err, addresses) {
      res.write(addresses[0]);
    })
});

console.log('server listening on port 8080');
server.listen(process.env.PORT || 8080);