angular.module('login')
.controller('LoginCtrl', ['$firebaseAuth', '$location', '$firebaseArray', 'Auth', 'currentAuth', 'database', 'userService', 'notificationMessages', '$timeout', 'alerts', 'contacts', 
  function($firebaseAuth, $location, $firebaseArray, Auth, currentAuth, database, userService, notificationMessages, $timeout, alerts, contacts) {
    var vm = this;
    vm.currentAuth = currentAuth;
    vm.user = {};

    //User login
    vm.logIn = function() {
      Auth.userLogIn(vm.user.email, vm.user.password)
      .then(function(firebaseUser) {
        var userId = firebaseUser.uid;
        //Check user's entry in the database
        return database.fetchUserFromDatabaseById(userId);
      })
      .then(function(user) {
        if (!user) {
          var currentUser = Auth.getCurrentAuthenticatedUser();
          database.addUserToDatabase(currentUser);
        }
        $location.path('/main');
      })
      .catch(function(error) {
        vm.error = error.message;
      });
    }

    //Sign up a new user and go to the main page
    vm.signUp = function() {
      Auth.userSignUp(vm.user.email, vm.user.password)
      .then(function(firebaseUser) {
        notificationMessages.addNotification('Your account has been successfully created!');
        database.addUserToDatabase(firebaseUser);
        $timeout(function(){$location.path('/main');}, 5000);
      })
      .catch(function(error) {
        vm.error = error.message;
      });
    }
}]);