angular.module('services')
.factory('database', ['$q', function ($q) {
	var connectionStatus = {},
	connectedRef = firebase.database().ref('.info/connected');
	connectedRef.on('value', function(snap) {
  		if (snap.val() === true) {
	    	setStatus(snap.val());
  		} else {
	    	setStatus(snap.val());
  		}
	}),
	service = {
		getDatabaseReference: getDatabaseReference,
		getConnectionStatus: getConnectionStatus,
		fetchUserFromDatabaseById: fetchUserFromDatabaseById,
		getUsersContactsRef: getUsersContactsRef,
		addUserToDatabase: addUserToDatabase,
		getReferenceToDatabaseLocation: getReferenceToDatabaseLocation,
		deleteUserCredentialsAndContacts: deleteUserCredentialsAndContacts
	}

	return service;

	//Set connection status
	function setStatus(value) {
		connectionStatus.connected = value;
	}

	//Reference to database
	function getDatabaseReference() {
		return firebase.database().ref();
	}

	//Connection status
	function getConnectionStatus() {
		return connectionStatus.connected;
	}

	function fetchUserFromDatabaseById(id) {
		var deferred = $q.defer();
		firebase.database().ref('/users/' + id).once('value')
		.then(function(snapshot) {
			var user = snapshot.val();
			deferred.resolve(user);
		});
		return deferred.promise;
	}

	function getReferenceToDatabaseLocation(location) {
		return getDatabaseReference().child(location);
	}

	function getUsersContactsRef(userId) {
		return getReferenceToDatabaseLocation('contacts').child(userId);
	}

	//Add user to the database
	function addUserToDatabase(user) {
	    getReferenceToDatabaseLocation('users').child(user.uid).set({
			provider: user.providerData[0].providerId,
			name: user.providerData[0].email,
			email: user.providerData[0].email
	    });
  	}

  	//Delete user and it's contacts from the database
  	function deleteUserCredentialsAndContacts(currentAuthenticatedUser) {
	    getReferenceToDatabaseLocation('users').child(currentAuthenticatedUser.uid).remove();
	    getReferenceToDatabaseLocation('contacts').child(currentAuthenticatedUser.uid).remove();
  	}
}]);