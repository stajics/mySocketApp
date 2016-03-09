'use strict';

angular.module('mySocketApp')
  .controller('ChatCtrl', function ($scope,$rootScope ,Socket, $http, UserService) {

    $rootScope.loggedIn = UserService.getUser().loggedIn;
    var $msgDiv = $('#msg');
    var $activeUsers = $('#activeUsers');
    $scope.activeUsers = [];

    Socket.on('updateActiveUsers', function(data) {
      $scope.activeUsers = data;
    });

    Socket.on('sendMsg', function(data){
      $msgDiv.append(data + "<br>");
    });

    Socket.emit('updateActiveUsers');

    $scope.send = function(){
      $http({
       url: "https://arcane-bastion-79114.herokuapp.com/send",
        // url: "http://localhost:9000/send",
        method: "POST",
        headers: {'authorization' : 'Bearer '+ UserService.getUser().token},
        data: {'msg' : $scope.msgToSend}
      }).then(function(response){
        Socket.emit('sendMsg',response.data);
      });
    };
    console.log("Userservice.loggedIn " + UserService.getUser().loggedIn);
    // $http({
    //   //url: "https://arcane-bastion-79114.herokuapp.com/activeUser",
    //   url: "http://localhost:9000/activeUser",
    //   method: "GET",
    //   headers: {'authorization' : 'Bearer '+ UserService.getUser().token}
    // }).then(function(response){
    //   console.log(response.data);
    // });


  });
