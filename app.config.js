angular.module('config', ['ngRoute'])
.constant('configFirebase', 
{
  apiKey: 'AIzaSyA9ykPhKrGwcNv5jBY56uYdSl-9oNv9pXE',
  authDomain: 'mycontacts-app-30c48.firebaseapp.com',
  databaseURL: 'https://mycontacts-app-30c48.firebaseio.com',
  storageBucket: 'mycontacts-app-30c48.appspot.com',
  messagingSenderId: '282654169506'
})
.run(['$rootScope', '$location', 'configFirebase', function($rootScope, $location, configFirebase) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      $location.path('/login');
    }
  });

  //Firebase initialization
  firebase.initializeApp(configFirebase);
}])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
  		.when('/login', {
		    templateUrl: 'login/login_form.template.html',
		    controller: 'LoginCtrl',
        controllerAs: 'vm',
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          'currentAuth': ['Auth', function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.getAuth().$waitForSignIn();
          }]
  		  }
      })
      .when('/main', {
        templateUrl: 'main/main.template.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          "currentAuth": ['Auth', function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $routeChangeError (see above)
          return Auth.getAuth().$requireSignIn();
          }]
        }
      })
      .when('/main/edit/:contactid', {
        templateUrl: 'edit/edit_contact_form.template.html',
        controller: 'EditCtrl',
        controllerAs: 'vm',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          "currentAuth": ['Auth', function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $routeChangeError (see above)
          return Auth.getAuth().$requireSignIn();
          }]
        }
      })
      .when('/main/new', {
        templateUrl: 'new/new_contact_form.template.html',
        controller: 'NewCtrl',
        controllerAs: 'vm',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          "currentAuth": ['Auth', function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $routeChangeError (see above)
          return Auth.getAuth().$requireSignIn();
          }]
        }
      })
		  .otherwise({redirectTo: '/main'});
}]);