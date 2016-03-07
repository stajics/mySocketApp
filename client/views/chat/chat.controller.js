'use strict';

angular.module('mySocketApp')
  .controller('ChatCtrl', function ($scope,Socket, $http, UserService) {

    var $msgDiv = $('#msg');

    Socket.on('sendMsg', function(data){
      $msgDiv.append(data + "<br>");
    });

    $scope.send = function(){
      $http({
        url: "http://localhost:9000/send",
        method: "POST",
        headers: {'authorization' : 'Bearer '+ UserService.getUser().token},
        data: {'msg' : $scope.msgToSend}
      }).then(function(response){
        Socket.emit('sendMsg',response.data);
      });
    };

    $http({
      url: "http://localhost:9000/activeUser",
      method: "GET",
      headers: {'authorization' : 'Bearer '+ UserService.getUser().token}
    }).then(function(response){
      console.log(response.data);
    });


  });
