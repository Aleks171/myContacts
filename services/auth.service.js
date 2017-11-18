angular.module('services')
.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
	var service = {
		getAuth: getAuth,
		deleteUserAuth: deleteUserAuth,
		userLogIn: userLogIn,
		userLogOut: userLogOut,
		userSignUp: userSignUp,
		getCurrentAuthenticatedUser: getCurrentAuthenticatedUser,
		getCurrentAuthenticatedUserID: getCurrentAuthenticatedUserID
	};
  	return service;

  	//Get authentication instance
  	function getAuth() {
  		return $firebaseAuth();
  	}

  	//Remove user authentication from the database
  	function deleteUserAuth() {
  		return getAuth().$deleteUser();
  	}

  	function userLogIn(email, password) {
		return getAuth().$signInWithEmailAndPassword(email, password);
	}

	function userLogOut() {
		getAuth().$signOut();
	}

	function userSignUp(email, password) {
		return getAuth().$createUserWithEmailAndPassword(email, password);
	}

	function getCurrentAuthenticatedUser() {
		return getAuth().$getAuth();
	}

	function getCurrentAuthenticatedUserID() {
		if (getCurrentAuthenticatedUser()) {
			return getCurrentAuthenticatedUser().uid;
		}
		else {
			throw new Error("Problem with Auth");
			//return 'iClUugCqgMUiRy8hbKWgCJx9YQU2';
		}
		//console.log('currentUser ', currentAuth);
		//return 'iClUugCqgMUiRy8hbKWgCJx9YQU2';
	}
}]);