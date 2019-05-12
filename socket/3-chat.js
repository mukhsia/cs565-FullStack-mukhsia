'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line

io.on('connection', function(objectSocket) {
	// send everyone the 'clients' event, containing an array with the ids of the connected clients - example: { 'strClients':['GxwYr9Uz...','9T1P4pUQ...'] }
	// send everyone the 'message' event, containing a message that a new client connected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... connected' }
	var clients = Object.keys(io.sockets.sockets);
	var msgSender = objectSocket.id;
	io.emit('clients', {'strClients':clients});
	io.emit('message', { 'strFrom':'server', 'strTo':'everyone', 'strMessage': msgSender+'... connected' });

	objectSocket.on('message', function(objectData) {
		var target = objectData.strTo;
		var msg = objectData.strMessage;
		// if the message should be received by everyone, broadcast it accordingly
		if(target === 'everyone')
		{
			io.emit('message', { 'strFrom': msgSender, 'strTo':'everyone', 'strMessage': msg });
		}
		// if the message has a single target, send it to this target as well as to the origin
		else
		{
			io.to(`${target}`).emit('message', { 'strFrom': msgSender, 'strTo':target, 'strMessage': msg });
			objectSocket.emit('message', { 'strFrom': msgSender, 'strTo':target, 'strMessage': msg });
		}
	});

	objectSocket.on('disconnect', function() {
		// send everyone the 'clients' event, containing an array of the connected clients - example: { 'strClients':['GxwYr9Uz...'] }
		io.emit('clients', {'strClients':clients});
		// send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... disconnected' }
		io.emit('message', { 'strFrom':'server', 'strTo':'everyone', 'strMessage': objectSocket.id+'... disconnected' });
	});
});

console.log('go ahead and open "http://localhost:8080/3-chat.html" in your browser');