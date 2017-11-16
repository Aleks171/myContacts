angular.module('components')
.directive('contactForm', function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			buttonDescription: '@',
			contact: '=',
			submitContact: '&',
			formHeader: '@'
		},
		controller: function formController($scope, $element, $attrs) {
			var tc = this;
			tc.addContact = function() {
			  	tc.submitContact();
			}
		},
		controllerAs: 'tc',
		bindToController: true,
		templateUrl: 'components/contactForm.template.html'
	}
});