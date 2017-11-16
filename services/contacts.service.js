angular.module('services')
.factory('contacts', ['$firebaseArray', 'Auth', 'database', function($firebaseArray, Auth, database) {
	var contacts,
	//Creating an object for getting an array of contacts
	service = {
		getContactsArray: getContactsArray,
		destroyContacts: destroyContacts,
		getContactById: getContactById
	}
	return service;

	function getContactsArray() {
		//If there's no contacts, then fetch them from the database:	
		if (contacts) {
			return contacts;
		} 
		else {
			contacts = getContacts();
			return contacts;
		}
	}

	//Close the connection with the database
	function destroyContacts() {
		contacts.$destroy();
		contacts = null;
	}

	//Get contacts from the database
	function getContacts() {
		var currentUserId = Auth.getCurrentAuthenticatedUserID(),
			contactsRef = database.getUsersContactsRef(currentUserId);
	  	return $firebaseArray(contactsRef);
	}

	function getContactById(id) {
		if (contacts) {
			var contact = contacts.$getRecord(id);
			if (!contact) {
				throw new Error("There's no contact with id: " + id);
				return null;
			}
			return contact;
		}
		else {
			throw new Error("Contacts are not instantiated");
		}
	}
}]);