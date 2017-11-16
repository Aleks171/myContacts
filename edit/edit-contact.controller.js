angular.module('editContact')
.controller('EditCtrl', ['$routeParams', 'contacts', 'notificationMessages','$location', 'alerts', function($routeParams, contacts, notificationMessages, $location, alerts) {
	var vm = this,
	contactId = $routeParams.contactid,
	contactsFromService = contacts.getContactsArray().$loaded()
	.then(function(data) {
		vm.contacts = data;
		vm.contact = contacts.getContactById(contactId);
		console.log("Contacts from EditCtrl: ", vm.contacts);
	})
	.catch(function(error) {
		alerts.addAlert(error.message);
	});
	
	//Submit edited form
  	vm.editContactSubmit = function() {
  		notificationMessages.addNotification('Contact has been saved.');
	    //Save record in contacts
	    vm.contacts.$save(vm.contact)
	    .then(function(ref) {
	      	notificationMessages.addNotification('Contact has been saved and synchronized.');
	      	$location.path('/main');
	    })
	    .catch(function(error) {
	      	console.log(error);
	      	notificationMessages.addNotification('Sorry, error occurred!');
	    });
  	}
}]);