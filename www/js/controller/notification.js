app.controller('notificationCtrl', function($scope, $http, $ionicPopup, $state, $window, $ionicHistory) {
	$scope.notifications = {};
	$scope.media = media;

	$scope.getAllNotification = function() {
		$http({
	        method: 'POST',
	        url: api + "notification",

	        data: $.param({
	        	user_key : $window.localStorage["user_key"]
	        } ),
	        // params :{
	        // 	user_key : $window.localStorage["user_key"]
	        // } ,
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        }
	    }).then(function(data, status, headers, config) {
	    		response = data.data;
	    	if (response.status == 200) {
	    		$scope.notifications = response.data;
	    	}
	    	else{
	    		$ionicPopup.alert({
			      	title: 'Notification',
			      	template: response.message
			    });
	    	}
	    	// console.log($scope.noti)
	    });
	}

});