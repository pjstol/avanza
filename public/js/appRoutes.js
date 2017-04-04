angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/login', {
      templateUrl: 'login.html',
      controller: 'loginController'
    });

  $locationProvider

    .html5Mode({
      enabled: true,
      requireBase: false
    });

}]);
