'use strict';

angular.module('mySocketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('homeEx',{
          url: '/homeEx',
          templateUrl: 'views/homeExample/homeEx.html',
          controller: 'HomeExCtrl',
          controllerAs: 'cont'
      });
  });
