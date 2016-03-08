'use strict';

angular.module('mySocketApp')
  .controller('LoginCtrl', function($scope, Socket, $http, UserService,$window, $state) {

    var $myDiv = $('#activeUsers');

    Socket.on('updateActiveUsers', function(data) {
      $myDiv.html(data);
    });

    Socket.emit('updateActiveUsers');

    //Login request (save token on succes)
    $scope.login = function() {
      var body = {
        'username': $scope.username,
        'password': $scope.password
      };
      $http({
        url: "https://arcane-bastion-79114.herokuapp.com/login",
        // url: "http://localhost:9000/login",
        method: "POST",
        data: body
      }).then(function(response) {
        console.log(response.status);
        if (response.status === 200) {
          console.log(response.data.username);
          console.log(response.data.apiToken);
          UserService.getUser().username = response.data.username;
          UserService.getUser().token = response.data.apiToken;
          Socket.emit('logUser', response.data.username);
          Socket.emit('updateActiveUsers');
          $state.go('chat');
        }
      }, function(response) {
        console.log(response.status);
      });
    };

      //Logoff user on close window
      angular.element($window).on("beforeunload", function(){
        $http({
          url: "https://arcane-bastion-79114.herokuapp.com/activeUser",
          // url: "http://localhost:9000/activeUser",
          method: "DELETE",
          headers: {'authorization' : 'Bearer '+ UserService.getUser().token}
        }).then(function(response){
          Socket.emit('updateActiveUsers');
          console.log('LOGGED OFF: ' + UserService.getUser().username);
        });
      });

  });
