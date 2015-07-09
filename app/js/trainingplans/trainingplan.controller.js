;(function (){

  'use strict';

  angular.module('PlanModule')
    .controller('PlanCtrl', ['$scope', 'PlanService', 'UserService', '$state', 'ngDialog', '$http', 'HEROKU', '$compile',
      function ($scope, PlanService, UserService, $state, ngDialog, $http, HEROKU, $compile) {

        var endpoint = HEROKU.URL;

        PlanService.getWorkouts()
          .success(function (data) {
            $scope.workoutList = data;
            console.log(data);
          });

        $scope.trainingLength = [
          30,
          45,
          60,
          75,
          90,
          105,
          120,
          150,
          180
        ];

        $scope.trainingPlans = [{
          name: 'Three Week Strength',
          start_date: 'July 9',
          end_date: 'July 27',
          image_url: 'http://www.placehold.it/300x300'
        }];

        $scope.logoutUser = function () {
          UserService.logoutUser();
        };

        $scope.clickToOpenAddW = function () {
          PlanService.clickToOpenAddW();
        };

        $scope.clickToOpenAddT = function () {
          PlanService.clickToOpenAddT();
        };

        // Send workout to database
        $scope.addWorkout = function (workout) {
          console.log(workout);
          PlanService.addWorkout(workout);
          $scope.closeThisDialog();
        };

        $scope.addTrainingPlan = function (plan) {
          console.log(plan);
          PlanService.addTrainingPlan(plan);
          $scope.closeThisDialog();
        };

        // var tpl = $compile('<input type="text" placeholder="Workout step" ng-focus="addInput()" ng-model="workout.steps">')($scope);

        // $scope.addInput = function () {
        //   $('#addedInputs').append(tpl);
        // };

        // Add prefix to input on focus
        $scope.addPrefix = function (prefix) {
          $(event.target).val(prefix);
        };

        $scope.expand = function () {
          $(event.target).siblings().not('.top').toggleClass('hide');
          $(event.target).toggleClass('hide');
        };



        // $scope.interests = [
        //   'Rugby',
        //   'Lacrosse',
        //   'Running'
        // ];

        // $scope.user = {
        //   interests: ['user']
        // };

        // $scope.checkAll = function() {
        //   $scope.user.interests = angular.copy($scope.interests);
        // };
        // $scope.uncheckAll = function() {
        //   $scope.user.interests = [];
        // };

      }

    ]);

}());
