app.controller('loginCtrl', function($scope, $http, $ionicPopup, $state, $window, $ionicHistory) {
	lc = {};
	$scope.loginform = {email : '', password : ''};


	$scope.loginsubmit = function() {
		removeMessage();
		loginform = $scope.loginform;
		if (loginform.password == '') $scope.errorMessage = 'Please Enter password';
		if (loginform.email == '') $scope.errorMessage = 'Please enter Email';
		if ($scope.errorMessage != '') {
			$ionicPopup.alert({
			      	title: 'login',
			      	template: $scope.errorMessage
			    });
			return;
		}


		$http({
	        method: 'POST',
	        url: api + "authentication/auth_login",

	        // data: loginform,
	        data: $.param(
	        	loginform
	        ),
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        }
	    }).then(function(data, status, headers, config) {
	    		response = data.data;
	    	if (response.status == 200) {
		    	$window.localStorage["user_key"] = response.data
		        $state.go('home.account');
	    	}
	    	else{
	    		$ionicPopup.alert({
			      	title: 'login',
			      	template: response.message
			    });
	    	}
	    });
	}

	function removeMessage(){
		$scope.errorMessage = '';
	}
});