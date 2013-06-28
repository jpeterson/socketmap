var io = require('socket.io').listen(8081);

var chat = io
  .of('/chat')
  .on('connection', function(socket) {
    socket.emit('a message', {
      that: 'only',
      '/chat': 'will get'
    });
    chat.emit('a message', {
      everyone: 'in',
      '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', function(socket) {
    socket.emit('item', {
      news: 'item'
    });
  });

var map = io
  .of('/map')
  .on('connection', function(socket) {

    // Listen for /map/onExtentChange
    socket.on('map/onExtentChange', function(data) {
      // Emit map/setExtent
      socket.broadcast.emit('map/setExtent', data);
    });
  });

io.on('connection', function(socket) {
    // Send greeting
    socket.emit('greeting', {
      greeting: socket.sessionId
    });

    // Send update every second
    setInterval(function() {
      socket.emit('timer', {
        date: new Date()
      });
    }, 500);

    // Listen for timer (coming from socket-driver)
    socket.on('timer', function(data) {
      socket.broadcast.emit('timer', data);
    });

});