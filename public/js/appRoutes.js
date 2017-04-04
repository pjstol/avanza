angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'home.html',
      controller: 'homeController'
    })

    .when('/login', {
      templateUrl: 'login.html',
      controller: 'loginController'
    })

    .when('/dashboard', {
      templateUrl: 'dashboard.html',
      controller: 'dashboardController'
    });

  $locationProvider

    .html5Mode({
      enabled: true,
      requireBase: false
    });

}]);
