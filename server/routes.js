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
var ValidToken = mongoose.model('validTokens');

module.exports = function(socket){

function createToken(username) {
  var apiToken = jwt.sign({
    'username': username
  }, secret);
  return apiToken;
}

//adds token id to db
function addIat(token){
  var decoded = jwt.verify(token, secret);
  var newValidToken = new ValidToken({
    tokenId: decoded.iat
  });
  newValidToken.save();
}

function addActiveUser(data){
  var newActiveUser = new ActiveUser({
    username: data
  });
  newActiveUser.save();
}

//For checking if token is valid
function isRevokedCallback(req, payload, done){
  var validTokenIds = [];
  ValidToken.find(function(err, tokens) {
  validTokenIds =  tokens.map(function(token){
      return token.tokenId;
    });
    if(validTokenIds.indexOf(payload.iat) !== -1){
      console.log("TOKEN VALID");
      return done(null, false);
    }else{
      console.log("TOKEN INVALID");
      return done(null, true);
    }
  });



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
        addActiveUser(req.body.username);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200);
        var newToken = createToken(req.body.username);
        addIat(newToken);
        res.send({
          username: req.body.username,
          apiToken: newToken
        });
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404);
      }
      res.end();
    }
  });

});

  //Logoff user (token still active!!!)
  router.delete('/activeUser',jwtExpress({secret: 'sifra', isRevoked: isRevokedCallback}), function(req, res) {
    ActiveUser.find({'username' : req.user.username}).remove(function(err,removed){
      if(removed){
        res.status(200).send();
      }
    });
  });

  //Check if user logged in
  router.get('/checkToken',jwtExpress({secret: 'sifra', isRevoked: isRevokedCallback}), function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send();
  });

  router.get('/activeUser',jwtExpress({secret: 'sifra', isRevoked: isRevokedCallback}), function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(req.user.username);
  });


  router.post('/send',jwtExpress({secret: 'sifra', isRevoked: isRevokedCallback}), function(req, res) {
    socket.sockets.emit('sendMsg', req.user.username + " : " + req.body.msg);
    res.status(200).send();
  });

  router.get('/', function(req, res) {
    //  var pera = new User({ username: 'pera', password: 'pera111' });
    //  var sima = new User({ username: 'sima', password: 'sima111' });
    // // var molly = new User({ username: 'Molly', password: 'molly111' });
    //  pera.save();
    //  sima.save();
    // // molly.save();
    res.sendFile(
      app.get('appPath') + '/index.html', {
        root: config.root
      }
    );
  });

  router.get('/:url(api|app|bower_components|assets)/*', function(req, res) {
    res.status(404).end();
  });

  return router;
};

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
