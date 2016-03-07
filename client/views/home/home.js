'use strict';

angular.module('mySocketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home',{
          url: '/home',
          templateUrl: 'views/home/home.html',
          controller: 'HomeCtrl',
      });
  });
