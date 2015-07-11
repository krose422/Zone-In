;(function (){

  'use strict';

  angular.module('PlanModule')
    .controller('PlanCtrl', ['$scope', 'PlanService', 'UserService', '$state', 'ngDialog', '$http', 'HEROKU', '$compile', '$filter', '$cookies',
      function ($scope, PlanService, UserService, $state, ngDialog, $http, HEROKU, $compile, $filter, $cookies) {

        $scope.user = $cookies.getObject('currentUser');

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
        $scope.list16 = [];


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
              w.planDays = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
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

        $scope.checkType = function (workout) {
            if (workout.running === true) {
              return 'images/running_icon.png';
            }
            if (workout.weightlifting === true) {
              return 'images/weight.png';
            }
        };

        PlanService.getUserWorkouts()
          .success(function (data) {
            $scope.userWorkoutList = data;
          });

        $scope.trainingLength = [30, 45, 60, 75, 90, 105, 120, 150, 180];

        $scope.dropFunc = function (workout) {
          console.log(workout);
        };

        $scope.dragStart = function (event) {
          var workoutId = $(event.currentTarget).data('id');
          $scope.planWorkouts.workoutIds.push(workoutId);
          console.log($scope.planWorkouts.workoutIds);
          // $(event.currentTarget).find('h5').html('Added to Plan');
        };

        $scope.currentTrainingPlan = $cookies.getObject('currentPlan');
        // console.log($scope.currentTrainingPlan.id);

        $scope.planWorkouts = {
          workoutIds: []
        };

        var TrainingPlanWorkouts = function (options) {
          this.plan_id = $scope.currentTrainingPlan.id,
          this.workout_id = options.workout_id
        };

        $scope.finishTrainingPlan = function () {
          // console.log($('.planning-dropzone').find('.planning-thumbnail').html());
          var trainingPlanWorkouts = new TrainingPlanWorkouts([]);
          trainingPlanWorkouts.workout_id = $scope.planWorkouts.workoutIds;
          // console.log(trainingPlanWorkouts);
          PlanService.finishTrainingPlan(trainingPlanWorkouts);
        };

        // DUMMY DATA
        // $scope.trainingPlan = [
        // {
        //   name: 'Three Week Strength',
        //   start_date: 'July 9',
        //   end_date: 'July 27',
        //   image_url: 'http://www.placehold.it/300x300'
        // },
        // {
        //   name: '10k Training Plan',
        //   start_date: 'July 11',
        //   end_date: 'August 11',
        //   image_url: 'http://www.placehold.it/300x300'
        // }
        // ];

        $scope.formatDate = function (date) {
          var momentDate = moment(date);
          var formattedDate = momentDate.format('MMM DD, YYYY');
          return formattedDate;
        };

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
          PlanService.addTrainingPlan(plan)
          // $scope.trainingPlan = plan;
            .then( function (data) {
              $state.go('training.plan');
              $scope.closeThisDialog();
            });
        };

        // Add prefix to input on focus
        $scope.addPrefix = function (prefix) {
          $(event.target).val(prefix);
        };

        $scope.expand = function () {
          $(event.target).siblings().not('.top').toggleClass('hide');
          $(event.target).toggleClass('hide');
        };

        // $scope.checkAll = function() {
        //   $scope.user.interests = angular.copy($scope.interests);
        // };
        // $scope.uncheckAll = function() {
        //   $scope.user.interests = [];
        // };



      }

    ]);

}());
