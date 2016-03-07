'use strict';

var mongoose = require('./mongoose.js');

var ActiveUser = mongoose.model('activeUsers', {
  username: String
});
var User = mongoose.model('users', {
  username: String,
  password: String
});

var users = [];

module.exports = function(io) {

  io.on('connection', function(socket) {

    socket.connectDate = new Date();
    socket.ip = (socket.handshake.address) ? socket.handshake.address : null;
    io.sockets.emit('addUser', users);
    // sockets inserts

    socket.on('sendMsg', function(data) {
      io.sockets.emit('sendMsg', data);
    });


    function updateActiveUsers() {
      var users = ActiveUser.find(function(err, user) {
        io.sockets.emit('updateActiveUsers', user.map(function(u) {
          return (u.username);
        }));
      });
    }

    socket.on('addUser', function(data) {
      var newActiveUser = new ActiveUser({
        username: data
      });
      newActiveUser.save();
      updateActiveUsers();
    });

    socket.on('updateActiveUsers', updateActiveUsers);

    socket.on('disconnect', function() {
      console.log('[%s] %s disconnected.', new Date().toUTCString(), socket.ip);
    });

    console.log('[%s] %s logged.', socket.connectDate.toUTCString(), socket.ip);

  });

};
