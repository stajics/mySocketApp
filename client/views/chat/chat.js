'use strict';

angular.module('mySocketApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main.chat', {
        url: '/chat',
        templateUrl: 'views/chat/chat.html',
        controller: 'ChatCtrl'
      });
  });
