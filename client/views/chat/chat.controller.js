'use strict';

angular.module('mySocketApp')
  .controller('ChatCtrl', function ($scope,Socket, $http, UserService) {

    var $msgDiv = $('#msg');

    Socket.on('sendMsg', function(data){
      $msgDiv.append(data + "<br>");
    });

    $scope.send = function(){
      $http({
        url: "https://arcane-bastion-79114.herokuapp.com/send",
        method: "POST",
        headers: {'authorization' : 'Bearer '+ UserService.getUser().token},
        data: {'msg' : $scope.msgToSend}
      }).then(function(response){
        Socket.emit('sendMsg',response.data);
      });
    };

    $http({
      url: "https://arcane-bastion-79114.herokuapp.com/activeUser",
      method: "GET",
      headers: {'authorization' : 'Bearer '+ UserService.getUser().token}
    }).then(function(response){
      console.log(response.data);
    });


  });
