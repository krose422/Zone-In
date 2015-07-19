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
              PlanService.setWorkoutColor(w);
            });
          })

          .then(function (data) {
            _getWorkoutDates();
            // _getPlanWorkouts();
            _getAlerts($scope.workoutDates);
          });

          var _getWorkoutDates = function () {
            PlanService.getWorkoutDates()
              .success(function (data) {
                $scope.workoutDates = data;
                $scope.workoutDates = _.each($scope.workoutDates, function (workout) {
                  workout.do_date = PlanService.formatDate(workout.do_date);
                  workout.workoutInfo = _.findWhere($scope.workoutList, {id: workout.workout_id});
                });

                $scope.incompleteWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                  return workout.workout_completion === false;
                });
                $scope.completedWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                  return workout.workout_completion === true;
                });

                // Add incomplete workouts to events array for calendar
                $scope.incompleteWorkoutDates = _.each($scope.incompleteWorkoutDates, function (workout) {
                  // workout.do_date = PlanService.formatDate(workout.do_date);
                  // workout.workoutInfo = _.findWhere($scope.workoutList, { id: workout.workout_id });
                  var incompleteWorkoutEvent = new PlanService.WorkoutEvent(workout.workoutInfo.name, workout.do_date, workout.do_date, workout.workoutInfo.color);
                  $scope.events.push(incompleteWorkoutEvent);
                });

                $scope.workoutDates = _.sortBy($scope.workoutDates, 'do_date');
                _getPlanWorkouts();
                _getWeekWorkouts();
                _getRunningStats();
              });
          };

          // Get user's adopted training plans and set workout information to each
          var _getPlanWorkouts = function () {
            PlanService.getPlans()
              .success(function (data) {
                $scope.trainingPlans = data;
                $scope.trainingPlans = _.each($scope.trainingPlans, function (plan) {
                  plan.workoutData = [];
                  plan.workoutData = _.filter($scope.workoutDates, function (workout) {
                    return workout.plan_id === plan.id;
                  });
              });

              PlanService.countCompleted($scope.trainingPlans);
              PlanService.getPlanCompletion($scope.trainingPlans);
              _completionPlans();
            });
          };

          var _getRunningStats = function () {
            // $scope.runningStats = [];
            $scope.runningStats = _.filter($scope.completedWorkoutDates, function (workout) {
              return workout.run_distance !== null && workout.run_distance > 0;
            });
            _.each($scope.runningStats, function (workout) {
              workout.pace = (workout.run_time / workout.run_distance).toFixed(2);
            });
          };

          var _getAlerts = function (workoutDatesArray) {
            $scope.workoutAlerts = _.filter($scope.workoutDates, function (workout) {
              var _alertDate = PlanService.formatDate(workout.do_date);
              $scope.today = PlanService.formatDate(new Date());
              return _alertDate === $scope.today;
            });
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

          var _completionPlans = function () {
            $scope.completedPlans = _.filter($scope.trainingPlans, function (plan) {
              return plan.completion === true;
            });
            // $scope.completedPlans = _.sortBy($scope.completedPlans, 'completedCount');
            $scope.incompletePlans = _.filter($scope.trainingPlans, function (plan) {
              return plan.completion === false;
            });

            $scope.incompletePlans = (_.sortBy($scope.incompletePlans, 'completedCount')).reverse();
          };

          $scope.logoutUser = function () {
            UserService.logoutUser();
          };

          $scope.toggleHide = function () {
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


          $scope.getCompletedPercent = function (plan) {
            var percentage = (plan.completedCount / plan.workoutData.length) * 100;
            return Math.round(percentage);
          };

          $scope.checkPercent = function (plan) {
            var percentage = (plan.completedCount / plan.workoutData.length) * 100;
            if (percentage === 0) {
              return '';
            } else {
              return plan.name;
            }
          };

          $scope.getPace = function (pace) {
            var pacePercent = pace / 15 * 100;
            return pacePercent;
          };

          $scope.getVisualPace = function (pace) {
            var secs = ((pace % 1) * 60).toFixed(0);
            var mins = Number(pace).toFixed(0);

            return mins + ':' + secs;
          };

          $scope.formatDateSmall = function (date) {
            return PlanService.formatDateSmall(date);
          };



      }
    ]);
}());
