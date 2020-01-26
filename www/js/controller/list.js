
// constructor(private camera: Camera) { }
app.controller('listCtrl', function($scope, $http, $ionicPopup,$ionicModal, $state, $window, $ionicHistory) {
   $scope.lists = {};
	$scope.modal = $ionicModal.fromTemplateUrl( 'templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) { $scope.modal = modal; })

  var timer ;
  $scope.takePicture = function (options) {

    navigator.camera.getPicture(onSuccess, onFail,
      {
          sourceType : navigator.camera.PictureSourceType.CAMERA,
          correctOrientation: true,
          quality: 100,
          targetWidth: 300,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          saveToPhotoAlbum:false
      });
      function onSuccess(imageData) {
          $scope.task.picture =  "data:image/jpeg;base64," + imageData;
          $scope.$apply();
      }

      function onFail(message) {
          // if (appConstants.debug) {
              alert('Failed because: ' + message);
          // }
      }
  };


  $scope.uploadFile = function() {
        var fileURL = $scope.picture;
        var url =  api + "task/upload_file";
        if (fileURL) {
            var MakeGray_Form = new FormData();
            MakeGray_Form.append("FileName", fileURL);
            $http({
            method : "POST",
            url    : url,
            data   : MakeGray_Form,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
            }).then(function(response){                     
               //response object should hold your base64 image data.
               //you can change src of an img tag with ng-src and let the browser render your image.
            },function(response){});
        }
        else{
            alert("Please upload an image");
        }
      
    }
   
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
      // console.log(taskId);
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
               if ($scope.diff > 0) {
                  if (response.time_start == 1) 
                  {
                    clearInterval(timer);
                    $scope.startTime('start', $scope.diff );
                  }
                  else{
                    $scope.countTime = $scope.diff;
                  }
               }
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
      return true;
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      $scope.is_reached = 0;
      $scope.task = {};
      $scope.task.picture = '';
      $scope.task.description = '';
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
   // $scope.is_time_start = 0;
   $scope.timeStart = 0;
  
   $scope.startTime = function(action, old_time = 0){
    $scope.timeStart = 1;
      last_time_count = $scope.countTime;
      $scope.countTime = ($scope.diff > 0) ? $scope.diff : 0;
      if (action == 'start') 
      {
        timer = setInterval(function(){
            $scope.countTime++;
            $scope.$apply();
            console.log($scope.countTime);
        }, 1000);  
        // $scope.is_time_start = 1;
      }else   
      {
        $scope.is_time_start = 1;
        // console.log('asdf')
        $scope.timeStart = 0;
        clearInterval(timer);
        $scope.countTime = last_time_count;
        $scope.diff = last_time_count;
      }
      if (old_time == 0) 
      {
        $http({
           method: 'POST',
           url: api + "task/save_start_stop_time",
           data: $.param({
               user_key : $window.localStorage["user_key"],
               task_id   : $scope.details.id
           }),
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then(function(data, status, headers, config) {
            response = data.data;
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
  $scope.task = {};
  $scope.task.picture = '';
  $scope.task.description = '';
  $scope.my_alert = {};
    $scope.my_alert.alert_message = '';
    $scope.my_alert.show_message = 0;

    $scope.hide_alert = function(){
        setTimeout(function () {
            console.log('hide messagea')
            $scope.my_alert.alert_message = '';
            $scope.my_alert.show_message = 0;
            $scope.my_alert = {};

        }, 3000);  
    }

  $scope.complete_task = function() {
     
    //   $state.go('home.list');
    //   return false;
      $http({
           method: 'POST',
           url: api + "task/complete_task",
           data: $.param({
               user_key : $window.localStorage["user_key"],
               task_id   : $scope.details.id,
           }),
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then(function(data, status, headers, config) {
            response = data.data;
         if (response.status == 200) {
             

             
            if (response.cam == 1) 
            {
                $scope.takePicture();
                $ionicPopup.alert({
                    title: response.heading,
                    template: response.message
                });
            }
            else{
                $scope.my_alert.alert_message = response.message;
                $scope.my_alert.show_message = 1;

                $scope.closeModal();
                $scope.hide_alert();
                $scope.getTaskList();

                // $scope.closeModal();
                // $state.go('home.list');
            }
             //  $ionicPopup.alert({
             //      title: 'Task',
             //      template: 'Task Updated successfully'
             // });
              // $scope.closeModal();
              // $state.go('home.account');
               // $scope.details = response.data;
         }
         else{
            $ionicPopup.alert({
                  title: response.heading,
                  template: response.message
             });
         }
       });

  }
  $scope.commentTask = function() {
    if ($scope.task.picture == '') {
        $ionicPopup.alert({
            title: "Task",
            template: "Please attached picture"
        });
      return false;
    }

        $http({
           method: 'POST',
           url: api + "task/comment_task",
           data: $.param({
               user_key : $window.localStorage["user_key"],
               task_id   : $scope.details.id,
               task       : $scope.task
           }),
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then(function(data, status, headers, config) {
            response = data.data;
            console.log(response);
         if (response.status == 200) {
              $ionicPopup.alert({
                  title: 'Task',
                  template: 'Task Updated successfully'
             });
             $scope.task.description = '';
             $scope.task.picture = "";
            //   $scope.closeModal();
              // $state.go('home.account');
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


  $scope.checkLocation = function() {

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

  }

   function onError(error) {
    alert(error.message);
    }

  $scope.is_reached = 0;
  var onSuccess = function(position) {
      $scope.current_location = {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,

      };

      $http({
           method: 'POST',
           url: api + "task/check_location",
           data: $.param({
               user_key : $window.localStorage["user_key"],
               latitude : $scope.current_location.latitude,
               longitude : $scope.current_location.longitude,
               task_id   : $scope.details.id
           }),
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then(function(data, status, headers, config) {
            response = data.data;
            console.log(response);
         if (response.status == 200) {
               $scope.is_reached = response.data;
         }
         else{
            $ionicPopup.alert({
                  title: 'login',
                  template: response.message
             });
         }
       });
        
    };



});



