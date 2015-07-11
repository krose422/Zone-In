;(function (){

  'use strict';

  angular.module('PlanModule')
    .controller('PlanCtrl', ['$scope', 'PlanService', 'UserService', '$state', 'ngDialog', '$http', 'HEROKU', '$compile', '$filter',
      function ($scope, PlanService, UserService, $state, ngDialog, $http, HEROKU, $compile, $filter) {

        $scope.list1 = [];
        $scope.list2 = [];
        $scope.list3 = [];
        $scope.list4 = [];
        $scope.list5 = [];
        $scope.list6 = [];
        $scope.list7 = [];
        $scope.list8 = [];
        $scope.list9 = [];
        $scope.list10 = [];
        $scope.list11 = [];
        $scope.list12 = [];
        $scope.list13 = [];
        $scope.list14 = [];
        $scope.list15 = [];


        var endpoint = HEROKU.URL;

        $scope.sort = function(workoutList, predicate) {
          // $(event.target).addClass('active');
          // $(event.target).siblings().removeClass('active');
          $scope.workoutList = _.sortBy(workoutList, predicate);
        };

        PlanService.getWorkouts()
          .success(function (data) {
            $scope.workoutList = data;
            // console.log($scope.workoutList);

            _.each($scope.workoutList, function (w) {
              w.planDays = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];;
              w.select = 'Select Days for Workout';

              if (w.description === 'Endurance') {
                w.color = '#2E313D';
              } else if (w.description === 'Strength') {
                w.color = '#176785';
              } else if (w.description === 'Agility') {
                w.color = '#499989';
              } else if (w.description === 'Speed') {
                w.color = '#BED194';
              } else if (w.description === 'Flexibility') {
                w.color = '#0F4559';
              } else {
                w.color = '#D0C8C5';
              }
            });
          });

        // $scope.checkType = function (workout) {
        //     if (workout.running === true) {
        //       return 'images/running_icon.png';
        //     }
        //     if (workout.weightlifting === true) {
        //       return 'images/weight.png';
        //     }
        // };

        PlanService.getUserWorkouts()
          .success(function (data) {
            $scope.userWorkoutList = data;
          });

        $scope.trainingLength = [30, 45, 60, 75, 90, 105, 120, 150, 180];

        $scope.planDays = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];

        $scope.days = {
          days: []
        };

        $scope.dropFunc = function (workout) {
          console.log(workout);
        };

        $scope.dragStart = function (event) {
        };

        // $scope.trainingPlan = {
        //   name: 'Three Week Strength',
        //   start_date: 'July 9',
        //   end_date: 'July 27',
        //   image_url: 'http://www.placehold.it/300x300'
        // };

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
          // $scope.trainingPlan = plan;
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
