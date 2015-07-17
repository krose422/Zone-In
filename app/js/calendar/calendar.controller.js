;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('CalendarCtrl', ['$scope', '$rootScope', 'UserService', '$location', 'PlanService', '$cookies',
      function ($scope, $rootScope, UserService, $location, PlanService, $cookies) {

        $scope.eventSources = [[
        {
          title: 'Testing Event Lorem Ipsum',
          allDay: true,
          start: "2015-07-20T04:00:00.000Z",
          end: "2015-07-20T04:00:00.000Z",
          color: '#499989',
          className: 'testEvent'
        },
        {
          title: 'Testing Again',
          start: "2015-07-22T08:00:00.000Z",
          end: "2015-07-22T08:00:00.000Z",
          color: '#BED194'
        },
        {
          title: 'Another Test',
          start: "2015-07-23T08:00:00.000Z",
          end: "2015-07-23T08:00:00.000Z",
          color: '#0F4559'
        }
        ]];

        // $scope.events = [
        // {
        //   title: 'testing event',
        //   allDay: true,
        //   start: "2015-07-20T04:00:00.000Z",
        //   end: "2015-07-26T04:00:00.000Z"
        // }];


        $scope.uiConfig = {
          calendar:{
          height: 800,
          editable: true,
          header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
          dayClick: $scope.alertEventOnClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize
        }
      };

        $scope.user = $cookies.getObject('currentUser');

        var _getPlanWorkouts = function () {
          PlanService.getPlans()
            .success(function (data) {
              $scope.trainingPlans = data;
              // console.log($scope.trainingPlans);

              $scope.trainingPlans = _.each($scope.trainingPlans, function (plan) {
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
              // console.log($scope.trainingPlans);
          });
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
          });


        PlanService.getWorkoutDates()
          .success(function (data) {
            console.log(data);
          });

          $scope.showUserMenu = function () {
            $('.logout').removeClass('hide');
          };

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

          $scope.active = function () {
            var eventTarget = $(event.target);
            var dashNavDiv = $('.dash-nav');
            $(event.target).parentsUntil('a').addClass('active');

            console.log($(event.target).parentsUntil('a').siblings());
            $(event.target).parentsUntil('a').siblings().removeClass('active');
          };

      }

    ]);

}());
