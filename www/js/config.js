app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  }).state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  }).state('home.task', {
      url: '/task',
      views: {
        'task': {
          templateUrl: 'templates/task.html',
          controller: 'taskCtrl'
        }
      }
    }).state('home.list', {
      url: '/list',
      views: {
        'list': {
          templateUrl: 'templates/list.html',
          controller: 'listCtrl'
        }
      }
    }).state('home.notification', {
      url: '/notification',
      views: {
        'notification': {
          templateUrl: 'templates/notification.html',
          controller: 'notificationCtrl'
        }
      }
    }).state('home.account', {
      url: '/account',
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