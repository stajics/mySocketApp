'use strict';

angular.module('mySocketApp', [
    'ui.router',
    'btford.socket-io',
    'ui.bootstrap',
    'LocalStorageModule'
  ])
  .config(function($urlRouterProvider, $stateProvider, $locationProvider) {


    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('main', {
        templateUrl: 'main.html',
        abstract: true,
        resolve: {
        //  Get AngularJS resource to query
          loggedIn: function(localStorageService,$http, UserService) {
            if(UserService.getUser().token !== null){
              return $http({
               url: "https://arcane-bastion-79114.herokuapp.com/checkToken",
                // url: "http://localhost:9000/checkToken",
                method: "GET",
                headers: {'authorization' : 'Bearer '+ UserService.getUser().token}
              }).then(function(response){
                if(response.status === 200){
                  console.log("RETURNING TRUE");
                  UserService.setLoggedIn(true);
                  return true;
                }else{
                    console.log("RETURNING FALSE");
                  return false;
                }
              });
            }else{
              UserService.clearStorage();
              console.log("RETURNING FALSE");
              return false;
            }
          }
        }
      });

  })
  .run(function($rootScope, UserService, Socket) {
    // you can inject any instance here
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        if(UserService.getUser().loggedIn === true){
          Socket.emit('logUser', UserService.getUser().username);
        }
        if(UserService.getUser().loggedIn === true && toState.name==="main.login"){
          event.preventDefault();
        }
        // do something
        console.log(fromState);
        console.log(toState);
        console.log('----------------------------------------');
      });

  });
