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
    if(req.url.indexOf('/') === 0)
    {
      var ipAddresses = "";
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      var path = JSON.stringify(req.url);
      path = path.substring(2, (path.length-1));
      dns.resolve(path, function(err, addresses) {
        if(err)
        {
            failed(); return;
        }
        var len = addresses.length;
        for(var i = 0; i < len; i++)
        {
          if(ipAddresses.length === 0)
          {
            ipAddresses = ipAddresses + addresses[i];
          }
          else
          {
            ipAddresses = ipAddresses + "\n" + addresses[i];
          }
        }
        success();
      });
    }

    function success()
    {
      res.write(ipAddresses);
      res.end();
    }

    function failed() 
    {
      res.write(path);
      res.end();
    }
});

console.log('server listening on port 8080');
server.listen(process.env.PORT || 8080);