var app = angular.module("ljApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: ''
    });
    $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: ''
    });
    $urlRouterProvider.otherwise('/');
//    $locationProvider.html5Mode(true);
  }]);
