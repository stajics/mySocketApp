angular.module("mySocketApp").factory("UserService", function() {

  var user = {
    'username' : '',
    'token' : ''
  };

  return {
    getUser: function() {
      return user;
    },
    loginUser: function(userToLogin) {
      user.username = userToLogin.username;
    }
  };
});
