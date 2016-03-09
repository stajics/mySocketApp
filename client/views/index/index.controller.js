'use strict';

angular.module('mySocketApp')
  .controller('IndexCtrl', function ($scope,$rootScope,Socket,$state,localStorageService, UserService, $http) {

    $rootScope.loggedIn = UserService.getUser().loggedIn;
    $scope.logOff = function(){
      if(UserService.getUser().loggedIn === true){
        $http({
          // url: "https://arcane-bastion-79114.herokuapp.com/activeUser",
          url: "http://localhost:9000/activeUser",
          method: "DELETE",
          headers: {'authorization' : 'Bearer '+ UserService.getUser().token}
        }).then(function(response){
          Socket.emit('updateActiveUsers');
          Socket.emit('logUser', "Anonymous");
          console.log('LOGGED OFF: ' + UserService.getUser().username);
          UserService.clearStorage();
          $state.reload();
        });
      }
    };

    $scope.loggedUser = "Anonymous";

    Socket.on('logUser', function(data) {
      $scope.loggedUser = data;
    });

    $scope.$watch(function(){
      return UserService.getUser().token;
    }, function(v){
      if(v === null){
        UserService.clearStorage();
        console.log("NO TOKEN!!!");
      }else{
        console.log(v);
      }
    });

  });
