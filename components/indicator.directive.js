angular.module('components')
.directive('indicator', function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			isOnline: '='
		},
		controller: function($scope) {
			var vm = this;
			vm.status = function() {
				return vm.isOnline ? "online" : "offline"; 
			}
		},
		controllerAs: 'vm',
		template: '<div class="indicator" title="{{vm.status()}}"></div>',
		bindToController: true
	}
});