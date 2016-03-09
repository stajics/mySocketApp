'use strict';

angular.module('mySocketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.home',{
          url: '/home',
          templateUrl: 'views/home/home.html',
          controller: 'HomeCtrl',
      });
  });
