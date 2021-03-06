app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      cache: false,
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    }).state('home', {
      url: '/home',
      cache: false,
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    }).state('home.task', {
      url: '/task',
      cache: false,
      views: {
        'task': {
          templateUrl: 'templates/task.html',
          controller: 'taskCtrl'
        }
      }
    }).state('home.list', {
      url: '/list',
      cache: false,
      views: {
        'list': {
          templateUrl: 'templates/list.html',
          controller: 'listCtrl'
        }
      }
    }).state('home.notification', {
      url: '/notification',
      cache: false,
      views: {
        'notification': {
          templateUrl: 'templates/notification.html',
          controller: 'notificationCtrl'
        }
      }
    }).state('home.account', {
      url: '/account',
      cache: false,
      views: {
        'account': {
          templateUrl: 'templates/account.html',
          controller: 'accountCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/login');
  $ionicConfigProvider.tabs.position('bottom');
});