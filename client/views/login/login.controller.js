'use strict';

angular.module('mySocketApp')
  .controller('LoginCtrl', function($scope, $rootScope, Socket, $http, UserService,$window, $state, localStorageService, loggedIn) {

    $rootScope.loggedIn = UserService.getUser().loggedIn;
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
          localStorageService.cookie.set("username", response.data.username);
          localStorageService.cookie.set("token", response.data.apiToken);
          UserService.setUsername(response.data.username);
          UserService.setToken(response.data.apiToken);
          UserService.setLoggedIn(true);
          Socket.emit('updateActiveUsers');
          $state.go('main.chat');
        }
      }, function(response) {
        console.log(response.status);
      });
    };
    console.log("Userservice.loggedIn " + UserService.getUser().loggedIn);


      //Logoff user on close window
      // angular.element($window).on("beforeunload", function(){
      //   $http({
      //     // url: "https://arcane-bastion-79114.herokuapp.com/activeUser",
      //     url: "http://localhost:9000/activeUser",
      //     method: "DELETE",
      //     headers: {'authorization' : 'Bearer '+ UserService.getUser().token}
      //   }).then(function(response){
      //     Socket.emit('updateActiveUsers');
      //     console.log('LOGGED OFF: ' + UserService.getUser().username);
      //   });
      // });

  });
