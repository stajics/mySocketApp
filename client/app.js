'use strict';

angular.module('mySocketApp', [
    'ui.router',
    'btford.socket-io'
  ])
  .config(function($urlRouterProvider, $stateProvider, $locationProvider) {


    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');

  })
  .run(function($rootScope) {
    // you can inject any instance here
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        // do something
        console.log(fromState);
        console.log(toState);
        console.log('----------------------------------------');
      });

  });
