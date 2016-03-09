angular.module("mySocketApp").factory("UserService", function(localStorageService) {

  return {
    setUsername: function(value) {
      localStorageService.set('username', value);
    },
    setToken: function(value) {
      localStorageService.set('token', value);
    },
    setLoggedIn: function(value) {
      localStorageService.set('loggedIn', value);
    },
    clearStorage: function() {
      localStorageService.clearAll();
    },
    getUser: function() {
      return {
        'username': localStorageService.get('username'),
        'token': localStorageService.get('token'),
        'loggedIn': localStorageService.get('loggedIn')
      };
    }
  };
});
