;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('DashboardCtrl', ['$scope', 'UserService', '$location', 'PlanService', '$cookies',
      function ($scope, UserService, $location, PlanService, $cookies) {

        $scope.user           = $cookies.getObject('currentUser');
        $scope.workoutAlerts  = [];
        $scope.dailyWorkouts  = [];
        $scope.events         = [];
        $scope.eventSources   = [$scope.events];
        $scope.uiConfig       = {
                                calendar:{
                                  height: 800,
                                  editable: true,
                                  header:{
                                  left: 'month',
                                  center: 'title',
                                  right: 'today prev,next'
                                  },
                                }
                              };

        PlanService.getWorkouts()
          .success(function (data) {
            $scope.workoutList = data;

            _.each($scope.workoutList, function (w) {
              w.workoutDate = '';
              if (w.description === 'Endurance') {
                w.color = '#2E313D';
              } else if (w.description === 'Strength') {
                w.color = '#176785';
              } else if (w.description === 'Agility') {
                w.color = '#0F4559';
              } else if (w.description === 'Speed') {
                w.color = '#BED194';
              } else if (w.description === 'Flexibility') {
                w.color = '#499989';
              } else {
                w.color = '#D0C8C5';
              }
            });
          })

          .then(function (data) {
            _getPlanWorkouts();
            _getWorkoutDates();
            _getAlerts();
          });

          $scope.logoutUser = function () {
            UserService.logoutUser();
          };

          $scope.toggleHide = function () {
            // $(element).toggleClass('hide');
            // $(event.target).toggleClass('hide');
            $(event.target).siblings().not('h4').toggleClass('hide');
            $(event.target).toggleClass('hide');
          };

          $scope.toggleChart = function () {
            $(event.target).siblings().not('h4').not('.progress-bars').toggleClass('hide');
            $(event.target).toggleClass('hide');
            $('.progress-bars').toggleClass('hide');
          };

          $scope.removeAlert = function (workoutAlerts) {
            _getAlerts();
            UserService.removeAlert();
          };

          // $scope.active = function () {
          //   var eventTarget = $(event.target);
          //   var dashNavDiv = $('.dash-nav');
          //   $(event.target).parentsUntil('a').addClass('active');
          //   $(event.target).parentsUntil('a').siblings().removeClass('active');
          // };

          $scope.getAlertColor = function (workoutAlerts) {
            if (workoutAlerts !== []) {
              return 'alert';
            }
          };

          $scope.checkDay = function (day) {
            var today = PlanService.formatDate(new Date());
            if (day === today) {
              return 'Today';
            } else {
              return day;
            }
          };

          $scope.openDashCalendar = function () {
            $('.dash-calendar').removeClass('hide');
            $('.workout-list-dash').addClass('hide');
            $('.list-view').removeClass('hide');
            $('.calendar-view-btn').addClass('hide');
          };

          $scope.openDashList = function () {
            $('.dash-calendar').addClass('hide');
            $('.workout-list-dash').removeClass('hide');
            $('.list-view').addClass('hide');
            $('.calendar-view-btn').removeClass('hide');
          };

          // $scope.checkWorkout = function (w) {
          //   if (w) {
          //     return w.workoutInfo.name;
          //   } else {
          //     return "off day";
          //   }
          // };

          var _getPlanWorkouts = function () {
            PlanService.getPlans()
              .success(function (data) {
                $scope.trainingPlans = data;
                // console.log($scope.trainingPlans);

                $scope.trainingPlans = _.each($scope.trainingPlans, function (plan) {
                // plan.planStyle = {width: plan.id + '%'};
                plan.workoutData = [];
                  // console.log($scope.workoutList);
                  return _.filter(plan.workouts, function (workoutId) {
                    // console.log(workoutId);
                    $scope.workoutInfo = _.findWhere($scope.workoutList, { id: workoutId });
                    // console.log($scope.workoutInfo);
                    plan.workoutData.push($scope.workoutInfo);
                    return $scope.workoutInfo;
                  });
                });
                console.log($scope.trainingPlans);
            });
          };

          var _getWorkoutDates = function () {
            PlanService.getWorkoutDates()
              .success(function (data) {
                $scope.workoutDates = data;
                $scope.workoutDates = _.each($scope.workoutDates, function (workout) {
                  workout.do_date = PlanService.formatDate(workout.do_date);
                  workout.workoutInfo = _.findWhere($scope.workoutList, {id: workout.workout_id});

                var workoutEvent = new PlanService.WorkoutEvent(workout.workoutInfo.name, workout.do_date, workout.do_date, workout.workoutInfo.color);
                $scope.events.push(workoutEvent);

                });
                $scope.workoutDates = _.sortBy($scope.workoutDates, 'do_date');
                $scope.incompleteWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                  return workout.workout_completion === false;
                });
                console.log($scope.incompleteWorkoutDates);

                _getWeekWorkouts();

                $scope.completedWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                  return workout.workout_completion === true;
                });

              });
          };

          var _getAlerts = function () {
            $scope.workoutAlerts = _.filter($scope.workoutDates, function (workout) {
              var _alertDate = PlanService.formatDate(workout.do_date);
              $scope.today = PlanService.formatDate(new Date());
              return _alertDate === $scope.today;
            });
            console.log($scope.workoutAlerts);
          };

          var _getWeekWorkouts = function () {
            $scope.dateArray = PlanService.getDates(new Date(), (new Date()).addDays(7));

            _.each($scope.dateArray, function (date) {
              var workouts = [];
              var fDate = PlanService.formatDate(date);
              workouts = _.filter($scope.incompleteWorkoutDates, function (w) {
                return w.do_date === fDate;
              });
              var dailyWorkout = new PlanService.DailyWorkout(fDate, workouts);
              $scope.dailyWorkouts.push(dailyWorkout);
            });
          };

      }

    ]);

}());
