app.controller('accountCtrl', function($scope, $http, $ionicPopup, $state, $window, $ionicHistory) {
	$scope.profile = {};
	$scope.media = media;

	$scope.getProfile = function() {
		$http({
	        method: 'GET',
	        url: api + "user/profile",

	        // data: loginform,
	        params :{
	        	user_key : $window.localStorage["user_key"]
	        } ,
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        }
	    }).then(function(data, status, headers, config) {
	    		response = data.data;
	    		
	    	if (response.status == 200) {
		    	$scope.profile = response.data;
	    	}
	    	else{
	    		$ionicPopup.alert({
			      	title: 'profile',
			      	template: response.message
			    });
	    	}
	    });
	}
});