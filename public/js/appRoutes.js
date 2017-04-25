angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'home.html',
      controller: 'homeController'
    })

    .when('/app/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })

    .when('/app/signup', {
      templateUrl: 'views/signup.html',
      controller: 'signupController'
    })

    .when('/app/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController'
    });

  $locationProvider

    .html5Mode(true)
    .hashPrefix('');

}]);
