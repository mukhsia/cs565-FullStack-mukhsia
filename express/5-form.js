'use strict';

var express = require('express'); // do not change this line
var parser = require('body-parser'); // do not change this line

// preface: use the body-parser middleware that helps you retrieve and parse the post data from the form

// http://localhost:8080/form should return the form as shown below
//   res.status(200);
//   
//   res.set({
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
const server = express();
var messages = "";
server.use(function(req, res, next) {
    next();
});
server.use(parser.json());
server.use(parser.urlencoded({
    extended: true
}));

// http://localhost:8080/form should return the form as shown above
server.get('/form', function(req, res) {
    res.status(200);
    
    res.set({
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

    res.end();
})


// http://localhost:8080/new should retrieve the post data using the body parser, save the name / message (in a global variable) and return 'thank you for your message' in plain text
server.post('/new', function(req, res) {
    var name = req.body.name;
    var message = req.body.message;
    if(messages.length === 0)
    {
        messages = messages + name + ": " + message;
    }
    else
    {
        messages = messages + "\n" + name + ": " + message;
    }
    res.status(200);
    res.set({
        'Content-Type': 'text/plain',
    });
    res.write("thank you for your message");
    res.end();
});

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text
server.get('/list', function(req, res) {

    res.status(200);
    res.set({
        'Content-Type': 'text/plain',
    });
    res.write(messages);
    res.end();
});
// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text


server.listen(process.env.PORT || 8080);