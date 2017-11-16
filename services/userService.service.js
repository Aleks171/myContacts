angular.module('services')
.factory('userService', ['database', 'alerts', '$q', function(database, alerts, $q) {
	var user = null,
	service = {
		getUserProperty: getUserProperty,
		getUser: getUser,
		clearCachedUser: clearCachedUser
	};
	return service;

	//Get cached user or fetch from database
	function getUser(userId) {
		var getUser = $q.defer();
		if (user) {
			getUser.resolve(user);
			return getUser.promise;
		} else {
			var userInDatabase = database.fetchUserFromDatabaseById(userId)
  		.then(function(data) {
  			user = data;
  			if (!user) {
  				throw new Error('User with id: ' + userId + "doesn't exist in the database");
  			}
      		getUser.resolve(user);
    		})
    		.catch(function(error) {
    			alerts.addAlert(error.message);
    		});
		return getUser.promise;
		}
	}
	
	function getUserProperty(property) {
		if (!user) {
			throw new Error('User ' + "doesn't exist");
			return;
		}
		if (!user[property]) {
			throw new Error('Property ' + "'" + property + "'" + " doesn't exist");
			return;
		}
		return user[property];
	}

	function clearCachedUser() {
		user = null;
	}
}]);