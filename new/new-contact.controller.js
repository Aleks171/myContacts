angular.module('newContact')
.controller('NewCtrl', ['notificationMessages', 'contacts', '$location', function(notificationMessages, contacts, $location) {
	var vm = this,
	contactsFromService = contacts.getContactsArray().$loaded()
	.then(function(data) {
		vm.contacts = data;
	})
	.catch(function(error) {
		notificationMessages.addNotification('Sorry, error occurred');
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