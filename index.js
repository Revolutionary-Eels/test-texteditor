var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var messages = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	// need to handle when user first connects
	messages.forEach(function(message) {
		io.emit('chat message', message);
	});
  console.log('a user connected');


	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		messages.push(msg);
		// console.log('messages: ', messages);

		io.emit('chat message', msg);
	})
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});