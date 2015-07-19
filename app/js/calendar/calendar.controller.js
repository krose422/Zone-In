;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('CalendarCtrl', ['$scope', '$rootScope', 'UserService', '$location', 'PlanService', '$cookies',
      function ($scope, $rootScope, UserService, $location, PlanService, $cookies) {

        $scope.user         = $cookies.getObject('currentUser');
        $scope.events       = [];
        $scope.eventSources = [$scope.events];
        $scope.uiConfig     = {
                                calendar:{
                                height: 800,
                                // editable: true,
                                header:{
                                left: 'month agendaWeek agendaDay',
                                center: 'title',
                                right: 'today prev,next'
                                },
                                // dayClick: $scope.alertEventOnClick,
                                // eventDrop: $scope.alertOnDrop,
                                // eventResize: $scope.alertOnResize
                                }
                              };

        PlanService.getWorkouts()
          .success(function (data) {
            $scope.workoutList = data;
            // console.log($scope.workoutList);

            _.each($scope.workoutList, function (w) {
              PlanService.setWorkoutColor(w);
            });
          })

          .then(function (data) {
            _getWorkoutDates();
          });

          var _getPlanWorkouts = function () {
            PlanService.getPlans()
              .success(function (data) {
                $scope.trainingPlans = data;
                $scope.trainingPlans = _.each($scope.trainingPlans, function (plan) {
                plan.workoutData = [];
                  return _.filter(plan.workouts, function (workoutId) {
                    $scope.workoutInfo = _.findWhere($scope.workoutList, { id: workoutId });
                    plan.workoutData.push($scope.workoutInfo);
                    return $scope.workoutInfo;
                  });
                });
              });
          };

          // Get user's adopted workouts
          var _getWorkoutDates = function () {
            PlanService.getWorkoutDates()
              .success(function (data) {
                $scope.workoutDates = data;
                // Connect workout information to user's adopted workouts
                $scope.workoutDates = _.each($scope.workoutDates, function (workout) {
                  workout.workoutInfo = _.findWhere($scope.workoutList, {id: workout.workout_id});
                });

                $scope.incompleteWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                  return workout.workout_completion === false;
                });
                $scope.completedWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                  return workout.workout_completion === true;
                });

                $scope.completedWorkoutDates = _.each($scope.completedWorkoutDates, function (workout) {
                  // Add complete workouts to events array
                  var completedWorkoutEvent = new PlanService.WorkoutEvent('COMPLETE: ' + workout.workoutInfo.name, workout.do_date, workout.do_date, '#ccc');
                  $scope.events.push(completedWorkoutEvent);
                });

                $scope.incompleteWorkoutDates = _.each($scope.incompleteWorkoutDates, function (workout) {
                  // Add incomplete workouts to events array
                  var incompleteWorkoutEvent = new PlanService.WorkoutEvent(workout.workoutInfo.name, workout.do_date, workout.do_date, workout.workoutInfo.color);
                  $scope.events.push(incompleteWorkoutEvent);
                });
                // console.log($scope.events);
                // Get training plans after workout information is available
                _getPlanWorkouts();
              });
          };

          $scope.logoutUser = function () {
            UserService.logoutUser();
          };

          // $scope.active = function () {
          //   var eventTarget = $(event.target);
          //   var dashNavDiv = $('.dash-nav');
          //   $(event.target).parentsUntil('a').addClass('active');

          //   console.log($(event.target).parentsUntil('a').siblings());
          //   $(event.target).parentsUntil('a').siblings().removeClass('active');
          // };

      }

    ]);

}());
