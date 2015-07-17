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
                                editable: true,
                                header:{
                                left: 'month agendaWeek agendaDay',
                                center: 'title',
                                right: 'today prev,next'
                                },
                                dayClick: $scope.alertEventOnClick,
                                eventDrop: $scope.alertOnDrop,
                                eventResize: $scope.alertOnResize
                                }
                              };



        PlanService.getWorkouts()
          .success(function (data) {
            $scope.workoutList = data;
            // console.log($scope.workoutList);

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

          var _getWorkoutDates = function () {
            PlanService.getWorkoutDates()
              .success(function (data) {
                $scope.workoutDates = data;
                $scope.workoutDates = _.each($scope.workoutDates, function (workout) {
                  workout.workoutInfo = _.findWhere($scope.workoutList, {id: workout.workout_id});

                var workoutEvent = new PlanService.WorkoutEvent(workout.workoutInfo.name, workout.do_date, workout.do_date, workout.workoutInfo.color);
                $scope.events.push(workoutEvent);

                });
              });
          };

          // var WorkoutEvent = function (name, start_date, end_date, color) {
          //   this.title = name,
          //   this.start = start_date,
          //   this.end = end_date,
          //   this.color = color
          // };

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
