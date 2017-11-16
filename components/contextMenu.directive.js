angular.module('components')
.directive('contextMenu', ['$document', '$window', function ($document, $window) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      contact: '=',
      editContact: '&',
      deleteContact: '&'
    },
    templateUrl: 'components/contextMenu.template.html',
    controller: function clickBtnCtrl($scope, $attrs, messageBar) {
      this.init = function(scope) {
        messageBar.addMessageBar(scope);
      };
     },
    link: function (scope, element, attrs, ctrl) {
        scope.isOpen = false;
        scope.showMesBar = function(event) {
          event.stopPropagation();
          var windowWidth = $window.innerWidth,
          windowHeigth = $window.innerHeight,
          menu = element.children()[4];
          ctrl.init(scope);
          //Position the context-bar properly
          if (windowWidth < 430) {
            menu.style.left = -60 + 'px';
          } else {
            menu.style.left = -35 + 'px';
          }
          $document.on('click', hideMenu);
        }
        //Hide context-menu when clicked on document
        function hideMenu() {
          scope.isOpen = false;
          scope.$apply();
          $document.off('click', hideMenu);
        }
      }
    }
}]);