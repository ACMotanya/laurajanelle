var app = angular.module("ljApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('findstore', {
      url: '/findstore',
      templateUrl: 'views/findstore.html',
      controller: ''
    })
    .state('test', {
      url: '/test',
      templateUrl: 'views/test.html',
      controller: ''
    });
    $urlRouterProvider.otherwise('findstore');
//    $locationProvider.html5Mode(true);
  }]);
