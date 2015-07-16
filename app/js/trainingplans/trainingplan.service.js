;(function (){

  'use strict';

  angular.module('PlanModule')
    .service('PlanService', ['$http', 'HEROKU', '$state', '$compile', 'ngDialog', '$cookies',
      function ($http, HEROKU, $state, $compile, ngDialog, $cookies) {

        var endpoint = HEROKU.URL;

        // Training plan constructor
        var TrainingPlan = function (options) {
          this.name = options.name,
          this.description = options.description,
          this.start_date = options.start_date,
          this.end_date = options.end_date
        };




        this.addTrainingPlan = function (plan) {
          var trainingPlan = new TrainingPlan(plan);
          console.log(trainingPlan);
          return $http.post(endpoint + '/plans', plan, HEROKU.CONFIG)
            .success( function (data) {
              $cookies.putObject('currentPlan', data);
            })
        };

        this.finishTrainingPlan = function (trainingPlanWorkouts) {
          console.log(trainingPlanWorkouts);
          // return $http.post(endpoint + '/plans/workouts', trainingPlanWorkouts, HEROKU.CONFIG)
          //   .success( function (data) {
          //     $cookies.remove('currentPlan');
          //     $state.go('training');
          //   });
        };

        this.getWorkouts = function () {
          return $http.get(endpoint + '/workouts/', HEROKU.CONFIG);
        };

        this.getPlans = function () {
          return $http.get(endpoint + '/plans/creator', HEROKU.CONFIG);
        };

        this.getUserWorkouts = function () {
          return $http.get(endpoint + '/workouts/athlete', HEROKU.CONFIG);
        };

        this.addWorkout = function (workout) {
          return $http.post(endpoint + '/workouts', workout, HEROKU.CONFIG)
            .success( function (data) {
              $state.go('training.plan');
            });
        };

        this.completeWorkout = function (workout) {
          return $http.patch(endpoint + '/plans/completion', workout, HEROKU.CONFIG)
            .success( function (data) {
              console.log(data);
            });
        };

        this.completePlan = function (plan) {
          console.log('in service function');
          return $http.patch(endpoint + '/plans/completion', plan, HEROKU.CONFIG)
            .success (function (data) {
              console.log(data);
            });
        };

        this.clickToOpenAddW = function () {
          ngDialog.open({
            template: 'js/templates/addworkout.tpl.html',
            controller: 'PlanCtrl'
          });
        };

        this.clickToOpenAddT = function () {
          ngDialog.open({
            template: 'js/templates/addtrainingplan.tpl.html',
            controller: 'PlanCtrl'
          });
        };

        this.openWorkoutModal = function (workout) {
          ngDialog.open({
            template: 'js/templates/workoutmodal.tpl.html',
            controller: 'PlanCtrl',
            data: workout
          });
        };



      }

    ]);

}());
