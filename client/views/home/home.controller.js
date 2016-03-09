'use strict';

angular.module('mySocketApp')
  .controller('HomeCtrl', function ($scope,$rootScope,Socket, UserService, loggedIn,localStorageService) {

    $rootScope.loggedIn = UserService.getUser().loggedIn;
    console.log("Userservice.loggedIn : " +  UserService.getUser().loggedIn);


  });
