angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'home.html',
      controller: 'homeController'
    })

    .when('/app/login', {
      templateUrl: 'login.html',
      controller: 'loginController'
    })

    .when('/app/dashboard', {
      templateUrl: 'dashboard.html',
      controller: 'dashboardController'
    });

  $locationProvider

    .html5Mode(true)
    .hashPrefix('');

}]);
