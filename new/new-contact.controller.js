angular.module('newContact')
.controller('NewCtrl', ['notificationMessages', 'contacts', '$location', 'alerts', function(notificationMessages, contacts, $location, alerts) {
	var vm = this,
	contactsFromService = contacts.getContactsArray().$loaded()
	.then(function(data) {
		vm.contacts = data;
	})
	.catch(function(error) {
		alerts.addAlert(error.message);
	});
	// Submit Contact
	vm.addFormSubmit = function() {
		notificationMessages.addNotification('Contact has been added');
		// Build Object for saving
		vm.contacts.$add(vm.contact)
		.then(function(ref) {
			// Send message to the user
			notificationMessages.addNotification('Contact has been added and synchronized');
			$location.path('#!/main');
		})
		.catch(function(error) {
		  	notificationMessages.addNotification('Sorry, error occurred');
		});
	}
}]);