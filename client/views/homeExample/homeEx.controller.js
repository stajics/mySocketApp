'use strict';

angular.module('mySocketApp')
  .controller('HomeExCtrl', function ($scope,Socket) {

    Socket = io.connect();
    var vm = this;
    $scope.name = 'HomeExCtrl';

    var $myDiv = $('#myDiv');

    Socket.on('myMsg', function(data){
      $myDiv.append(data);
    });

    Socket.on('addUser', function(data){
      $myDiv.html(data);
    });

    $scope.send = function(){
      Socket.emit('myMsg', 'Poruka');
      console.log("BBBBBBB");
    };

    $scope.addUser = function(){
      Socket.emit('addUser', 'User ');
    };

    angular.extend(vm, {
      name: 'HomeExCtrl'
    });

  });
