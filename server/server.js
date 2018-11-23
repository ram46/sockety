var express = require('express');
var app = express();
var path = require('path')

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(path.join(__dirname, '/')))


const PORT = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});


// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });

//    socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(PORT, function(){
  console.log("server listening");
});