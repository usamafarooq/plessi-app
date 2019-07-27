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
	    		console.log(response);
	    		$scope.profile = response.data;
	    	// if (response.status == 200) {
		    // 	$window.localStorage["user_key"] = response.data
		    //     $state.go('home.account');
	    	// }
	    	// else{
	    	// 	$ionicPopup.alert({
			   //    	title: 'login',
			   //    	template: response.message
			   //  });
	    	// }
	    });
	}
});