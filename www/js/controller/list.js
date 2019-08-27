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
                  title: 'Task',
                  template: response.message
             });
         }
       });
   } 


   $scope.getTaskDetail = function(taskId) {
      console.log(taskId);
      $http({
           method: 'POST',
           url: api + "task/details/"+taskId,
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
               $scope.details = response.data;
               $scope.diff = response.diff;
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

   $scope.openModal = function(id) {
      $scope.countTime = 0;
      $scope.timeStart = 0;
      this.getTaskDetail(id);
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
  $scope.timeStart = 0;
   $scope.startTime = function(old_time = 0){
    $scope.timeStart = 1;

      $scope.countTime = old_time;    
      var timer = setInterval(function(){
          $scope.countTime++;
          $scope.$apply();
          // console.log($scope.countTime);
      }, 1000);  

      console.log(old_time);
      if (old_time == 0) 
      {
        $http({
           method: 'POST',
           url: api + "task/save_start_time",
           data: $.param({
               user_key : $window.localStorage["user_key"],
               task_id   : $scope.details.id
           }),
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then(function(data, status, headers, config) {
            response = data.data;
            console.log(response);
         if (response.status == 200) {
               // $scope.details = response.data;
         }
         else{
            $ionicPopup.alert({
                  title: 'login',
                  template: response.message
             });
         }
       });
      }
  }


  $scope.completeTask = function() {
        $http({
           method: 'POST',
           url: api + "task/complete_task",
           data: $.param({
               user_key : $window.localStorage["user_key"],
               task_id   : $scope.details.id
           }),
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then(function(data, status, headers, config) {
            response = data.data;
            console.log(response);
         if (response.status == 200) {
               // $scope.details = response.data;
         }
         else{
            $ionicPopup.alert({
                  title: 'login',
                  template: response.message
             });
         }
       });
      }
});



