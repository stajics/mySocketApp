'use strict';

var express = require('express');
var chalk = require('chalk');
var config = require('./config/environment');


//mongoose.connect('mongodb://localhost:27017/myDB');
//mongoose.connect(config.mongo.uri, config.mongo.options);

var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')(server, { serveClient: true });
require('./config/sockets.js')(socket);

require('./config/express')(app);
var routes = require('./routes');
app.use('/',routes);

server.listen(config.port, config.ip, function () {


// //mongoose.connect('mongodb://localhost:27017/myDB');
// mongoose.connect('mongodb://stajics:srle111@ds019488.mlab.com:19488/users');
// console.log(mongoose.connection.readyState);
//
// var TestUsers = mongoose.model('TestUsers',{name: String});
// var peter = new TestUsers({ name: 'Peter' });
// //peter.save();

  console.log(
    chalk.red('\nExpress server listening on port ')
    + chalk.yellow('%d')
    + chalk.red(', in ')
    + chalk.yellow('%s')
    + chalk.red(' mode.\n'),
    config.port,
    app.get('env')
  );

  if (config.env === 'development') {
    require('ripe').ready();
  }

});

module.exports = server;
