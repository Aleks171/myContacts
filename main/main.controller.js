angular.module('main')
.controller('MainCtrl', ['$firebaseAuth', '$location', '$firebaseArray', 'currentAuth', 'Auth', 'contacts', 'userService', '$timeout', 'notificationMessages', 'alerts', 'database', function($firebaseAuth, $location, $firebaseArray, currentAuth, Auth, contacts, userService, $timeout, notificationMessages, alerts, database) {
  var vm = this,

  //Load contacts
  contactsFromService = contacts.getContactsArray().$loaded()
  .then(function(data) {
    vm.contacts = data;
  })
  .catch(function(error) {
    alerts.addAlert(error.message);
  });

  //Show one opened accordion at a time
  vm.oneAtATime = true;

  //Notification alerts
  vm.alerts = alerts.alerts;
  vm.addAlert = function(message) {
    alerts.addAlert(message);
  };
  vm.closeAlert = function(index) {
    alerts.closeAlert(index);
  };

  //Listener for changes in the authentication state
  Auth.getAuth().$onAuthStateChanged(function(firebaseUser) {
    if (!firebaseUser) {
      $location.path('/');      
    }
  });
  
  //Delete user from the database and it's contacts
  vm.deleteUser = function() {
    var askForConfirm = confirm('All your contacts and profile will be deleted! Do you want to continue?');
    if (askForConfirm) {
      database.deleteUserCredentialsAndContacts(currentAuth);
      Auth.deleteUserAuth()
      .then(function() {
        contacts.destroyContacts();
        alert('Your profile has been successfully removed!');
      })
      .catch(function(error) {
        vm.addAlert('Please log in again and then delete your account.');
      });
    } else { return false; }
  }

  //Connection status of the database
  vm.getConnectionStatus = function() {
    return database.getConnectionStatus();
  };

  //Fetch current authenticated user from the database
  vm.getUser = userService.getUser(currentAuth.uid)
  .then(function(user) {
    vm.userEmail = userService.getUserProperty('email');
  });
  
  //Log user out
  vm.logOut = function() {
    contacts.destroyContacts();
    userService.clearCachedUser();
    alerts.clearAlertMessages();
    Auth.userLogOut();
  }

  // Remove contact
  vm.removeContact = function(contact) {
    var result = confirm('Do you realy want to delete the contact?');
      if (result) {
        vm.contacts.$remove(contact)
        .then(function(ref) {
          notificationMessages.addNotification('Contact has been removed');
        })
        .catch(function(error) {
          notificationMessages.addNotification('Sorry, error occurred');
        });
      }
  }
}]);