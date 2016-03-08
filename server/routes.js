'use strict';

var config = require('./config/environment');
var express = require('express');
var router = express.Router();

var mongoose = require('./config/mongoose.js');

//JWTs
var jwt = require('jsonwebtoken');
var jwtExpress = require('express-jwt');
var secret = 'sifra';

//mongoose models
var ActiveUser = mongoose.model('activeUsers');
var User = mongoose.model('users');

router.get('/', function(req, res) {
  res.sendFile(
    app.get('appPath') + '/index.html', {
      root: config.root
    }
  );
});

router.get('/:url(api|app|bower_components|assets)/*', function(req, res) {
  res.status(404).end();
});

function createToken(username) {
  var apiToken = jwt.sign({
    'username': username
  }, secret);
  return apiToken;
}

//Login check (return token on succes)
router.post('/login', function(req, res) {

  console.log('USERNAME: ' + req.body.username);
  console.log('PASSWORD: ' + req.body.password);

  console.log('--------------------MONGOOSE----------------------');
  User.find({
    username: req.body.username,
    password: req.body.password
  }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log('Length : ' + user.length);
      if (user.length === 1) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(200);
        res.send({
          username: req.body.username,
          apiToken: createToken(req.body.username)
        });
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404);
      }
      res.end();
    }
  });
  // var peter = new User({ username: 'Peter', password: 'peter111' });
  // var sam = new User({ username: 'Sam', password: 'sam111' });
  // var molly = new User({ username: 'Molly', password: 'molly111' });
  // peter.save();
  // sam.save();
  // molly.save();
});

  //Logoff user (token still active!!!)
  router.delete('/activeUser',jwtExpress({secret: 'sifra'}), function(req, res) {
    ActiveUser.find({'username' : req.user.username}).remove(function(err,removed){
      if(removed){
        res.status(200).send();
      }
    });
  });


  router.get('/activeUser',jwtExpress({secret: 'sifra'}), function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(req.user.username);
  });

  router.post('/send',jwtExpress({secret: 'sifra'}), function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(req.user.username + " : " + req.body.msg);
  });
module.exports = router;
// module.exports = function (app) {
//
//   // API
//
//   app.route('/:url(api|app|bower_components|assets)/*')
//     .get(function (req, res) {
//       res.status(404).end();
//     });
//
//   app.route('/*')
//     .get(function (req, res) {
//       res.sendFile(
//         app.get('appPath') + '/index.html',
//         { root: config.root }
//       );
//     });
//
// };
