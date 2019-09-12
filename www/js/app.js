// var api = 'http://192.168.0.101/isolaCRM/api/';
// var media = 'http://192.168.0.101/isolaCRM/uploads/';
var api = 'http://www.sirinetwork.it/isolaCRM/api/';
var media = 'http://www.sirinetwork.it/isolaCRM/uploads/';
var app = angular.module('crmApp', ['ionic', 'ui.calendar']);
var admin_url = 'http://www.sirinetwork.it/isolaCRM/admin';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

app.factory('Camera', function($q) {
   return {
      getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }
});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


