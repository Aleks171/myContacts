angular.module('components')
.directive('snackbar', ['$timeout', 'notificationMessages', function ($timeout, notificationMessages) {
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		template: '<div class="snackbar">{{notification}}</div>',
		link: 	function (scope, elem, attrs) {
					scope.$watch(function(){return notificationMessages.notifications;}, function (newValue) {
						if (newValue.length !== 0) {
							$timeout(function(){ elem.addClass("showSnackbar"); }, 800);
							$timeout(function(){ elem.removeClass("showSnackbar"); }, 5000);
							var len = newValue.length;
							scope.notification = newValue[len-1];
						}
					}, true);
		}
	}
}]);