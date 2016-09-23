var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	// need to handle when user first connects

  console.log('a user connected');

	socket.on('change', function(msg) {
		io.emit('change', msg);
	})
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});