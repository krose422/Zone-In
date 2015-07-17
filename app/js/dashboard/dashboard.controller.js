;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('DashboardCtrl', ['$scope', 'UserService', '$location', 'PlanService', '$cookies',
      function ($scope, UserService, $location, PlanService, $cookies) {

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
              console.log($scope.trainingPlans);
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

          // $scope.active = function () {
          //   var eventTarget = $(event.target);
          //   var dashNavDiv = $('.dash-nav');
          //   $(event.target).parentsUntil('a').addClass('active');
          //   $(event.target).parentsUntil('a').siblings().removeClass('active');
          // };

          $scope.removeAlert = function () {
            $(event.target).removeClass('alert');
            $('.alert-dropdown').toggleClass('hide');
          };

      }

    ]);

}());
