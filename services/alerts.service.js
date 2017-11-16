angular.module('services')
.service('alerts', function() {
	this.alerts = [];
	this.addAlert = function(message) {
		this.alerts.push({type: 'alert', msg: message});
	}
	this.closeAlert = function(index) {
		this.alerts.splice(index, 1);
	}
	this.clearAlertMessages = function() {
		this.alerts = [];
	}
});