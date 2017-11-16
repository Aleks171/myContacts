angular.module('services')
.service('notificationMessages', function() {
	var that = this;
	this.notifications = [];
	this.addNotification = function(msg) {
		this.notifications.push(msg);
	}
});