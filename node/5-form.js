'use strict';

var http = require('http'); // do not change this line
var querystring = require('querystring'); // do not change this line

// http://localhost:8080/form should return the form as shown below
//   res.writeHead(200, {
//   	'Content-Type': 'text/html'
//   });
//   
//   res.write('<!DOCTYPE html>');
//   res.write('<html>');
//   	res.write('<body>');
//   		res.write('<form action="/new" method="post">');
//   			res.write('<input type="text" name="name">');
//   			res.write('<input type="text" name="message">');
//   			res.write('<input type="submit" value="submit">');
//   		res.write('</form>');
//   	res.write('</body>');
//   res.write('</html>');
//   
//   res.end();

var messages = "";

const server = http.createServer(function(req, res) {
    if(req.url === '/form')
    {
       res.writeHead(200, {
       	'Content-Type': 'text/html'
       });
       
       res.write('<!DOCTYPE html>');
       res.write('<html>');
       	res.write('<body>');
       		res.write('<form action="/new" method="post">');
       			res.write('<input type="text" name="name">');
       			res.write('<input type="text" name="message">');
       			res.write('<input type="submit" value="submit">');
       		res.write('</form>');
       	res.write('</body>');
       res.write('</html>');
    }

    else if(req.url === '/new' && req.method === 'POST')
    {
        var body = '';

        req.on('data', function(data) {
            body += data;
        });

        req.on('end', function () {
            var post = querystring.parse(body);
            if(messages.length === 0)
            {
                messages = messages + post['name'] + ": " + post['message'];
            }
            else
            {
                messages = messages + "\n" + post['name'] + ": " + post['message'];
            }
        });

        res.writeHead(200, {
            'Content-Type': 'text/plain',
        });
        res.write('thank you for your message');
    }

    else if (req.url === '/list')
    {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
        });
        res.write(messages);

    }
    res.end();

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text

// http://localhost:8080/form should return the form as shown above

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text

});

console.log('server listening on port 8080');
server.listen(process.env.PORT || 8080);