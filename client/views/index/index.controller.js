'use strict';

angular.module('mySocketApp')
  .controller('IndexCtrl', function ($scope,Socket) {

    $scope.loggedUser = "Anonymous";

    Socket.on('logUser', function(data) {
      $scope.loggedUser = data;
    });
  });
