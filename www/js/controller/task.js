app.controller('taskCtrl', function($scope, $http, $ionicPopup, $state, $ionicHistory, $window) {
// var app_calendar_events_limit = 4;
// var app_default_view_calendar="month";
// var isRTL = 'false';
// var app_timezone="Europe/Rome";
// var app_calendar_first_day="1";
// var n = {
//     themeSystem: "bootstrap3",
//     customButtons: {},
//     header: {
//         left: "prev,next today",
//         center: "title",
//         right: "month,agendaWeek,agendaDay,viewFullCalendar,calendarFilter"
//     },
//     editable: !1,
//     eventLimit: parseInt(app_calendar_events_limit) + 1,
//     views: {
//         day: {
//             eventLimit: !1
//         }
//     },
//     defaultView: app_default_view_calendar,
//     isRTL: "true" == isRTL,
//     eventStartEditable: !1,
//     timezone: app_timezone,
//     firstDay: parseInt(app_calendar_first_day),
//     year: moment.tz(app_timezone).format("YYYY"),
//     month: moment.tz(app_timezone).format("M"),
//     date: moment.tz(app_timezone).format("DD"),
//     loading: function (e, t) {
//         e && $("#calendar .fc-header-toolbar .btn-default").addClass("btn-info").removeClass("btn-default").css("display", "block"), e ? $(".dt-loader").removeClass("hide") : $(".dt-loader").addClass("hide")
//     },
//     eventSources: [{
//         url: admin_url + "utilities/get_calendar_data",
//         data: function () {
//             var e = {};
//             return $("#calendar_filters").find("input:checkbox:checked").map(function () {
//                 e[$(this).attr("name")] = !0
//             }).get(), jQuery.isEmptyObject(e) || (e.calendar_filters = !0), e
//         },
//         type: "POST",
//         error: function () {
//             console.error("There was error fetching calendar data")
//         }
//     }],
//     eventLimitClick: function (e, t) {
//         $("#calendar").fullCalendar("gotoDate", e.date), $("#calendar").fullCalendar("changeView", "basicDay")
//     },
//     eventRender: function (e, t) {
//         t.attr("title", e._tooltip);
//         t.attr("onclick", e.onclick);
//         t.attr("data-toggle", "tooltip");
//         e.url || t.click(function () {
//             view_event(e.eventid)
//         });
//         if (e.ranges) {
//             return (e.ranges.filter(function(range){ // test e against all the ranges
//                 return (e.start.isBefore(range.end) && e.end.isAfter(range.start));
//             }).length) > 0;
//         }
//     },

//     dayClick: function (e, t, a) {
//         var i = e.format();
//         $.fullCalendar.moment(i).hasTime() || (i += " 00:00");
//         var n = 24 == app_time_format ? app_date_format + " H:i" : app_date_format + " g:i A",
//             s = (new DateFormatter).formatDate(new Date(i), n);
//         return $("input[name='start'].datetimepicker").val(s), $("#newEventModal").modal("show"), !1
//     }
// };
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

  $scope.events = [];

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
         if (response.status == 200) {
               taskLists = response.data;
               events = [];
               $.each(taskLists, function(index, val) {
                 startdate = val.startdate.split('-');
                 month = parseInt(startdate[1])-1;
                 startdate = new Date(startdate[0], month, startdate[2] );
                 duedate = startdate;
                 if (val.duedate != null && val.duedate != '1970-01-01') 
                 {
                  duedate = val.duedate.split('-');
                  month = parseInt(duedate[1])-1;
                  duedate = new Date(duedate[0], month, duedate[2] );
                 }
                 calendarData = {
                  type : 'task',
                  title: val.name,
                  start: startdate,
                  end: duedate,
                  allDay:false
                 };
                 events.push(calendarData);
                 // console.log(startdate);

               });

               $scope.events = events;
               console.log(events);
               $scope.initCalender();
         }
         else{
            $ionicPopup.alert({
                  title: 'Task',
                  template: response.message
             });
         }
       });
   }


$scope.initCalender = function() {

	$scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
        	left: "prev,next today",
        	center: "title",
        	right: "month,agendaWeek,agendaDay"
        },
        eventClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        events : $scope.events
        // events: calendar_events
      }
    };
}

});