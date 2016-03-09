'use strict';

angular.module('mySocketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.login',{
          url: '/login',
          templateUrl: 'views/login/login.html',
          // templateProvider: function(UserService,$http){
          //   return $http.get('./views/login/login.html');
          // },
          controller: 'LoginCtrl',
      });
  });
