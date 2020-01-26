// var api = 'http://192.168.0.102/isolaCRM/api/';
// var media = 'http://192.168.0.102/isolaCRM';
// var assets = 'http://192.168.0.102/isolaCRM/assets';
// var api = 'http://localhost/isolaCRM/api/';
// var media = 'http://localhost/isolaCRM/';
var api = 'http://www.sirinetwork.it/isolaCRM/api/';
var media = 'http://www.sirinetwork.it/isolaCRM/';
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

app.filter('secondsToTime', function() {

    function padTime(t) {
        return t < 10 ? "0"+t : t;
    }

    return function(_seconds) {
        if (typeof _seconds !== "number" || _seconds < 0)
            return "00:00:00";

        var hours = Math.floor(_seconds / 3600),
            minutes = Math.floor((_seconds % 3600) / 60),
            seconds = Math.floor(_seconds % 60);

        return padTime(hours) + ":" + padTime(minutes) + ":" + padTime(seconds);
    };
});


