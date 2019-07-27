var api = 'http://localhost/isolaCRM/api/';
var media = 'http://localhost/isolaCRM/uploads/';
// var api = 'http://www.sirinetwork.it/isolaCRM/api/';
// var media = 'http://www.sirinetwork.it/isolaCRM/uploads/';
var app = angular.module('crmApp', ['ionic', 'ui.calendar']);
var admin_url = 'http://www.sirinetwork.it/isolaCRM/admin';
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
