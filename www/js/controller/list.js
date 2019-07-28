app.controller('listCtrl', function($scope, $http, $ionicPopup,$ionicModal, $state, $window, $ionicHistory) {
   $scope.lists = {};
	$scope.modal = $ionicModal.fromTemplateUrl( 'templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) { $scope.modal = modal; })

   $scope.getTaskList = function() {
      $http({
           method: 'POST',
           url: api + "task",
           data: $.param({
               user_key : $window.localStorage["user_key"]
           }),
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then(function(data, status, headers, config) {
            response = data.data;
            console.log(response);
         if (response.status == 200) {
               $scope.lists = response.data;
         }
         else{
            $ionicPopup.alert({
                  title: 'login',
                  template: response.message
             });
         }
       });
   } 


   $scope.priority = function(priority) {
      var return_val =  priority;
     switch(priority) {
         case '1':
            return_val = 'low';
         break;
         case '2':
            return_val = 'mediun';
         break;
         case '3':
            return_val = 'high';
         break;
         case '4':
            return_val = 'urgent';
         break;
      }

      return return_val;
   } 

   $scope.openModal = function() {
      $scope.modal.show();
   };
	
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
});