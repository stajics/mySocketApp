'use strict';

angular.module('mySocketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login',{
          url: '/login',
          templateUrl: 'views/login/login.html',
          controller: 'LoginCtrl',
      });
  });
