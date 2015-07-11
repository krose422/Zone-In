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

        this.finishTrainingPlan = function (workouts) {
          return $http.post(endpoint + '/plans/workouts', workouts, HEROKU.CONFIG)
            .success( function (data) {
              $cookies.remove('currentPlan');
              console.log('successful training plan finish');
            });
        };

        this.getWorkouts = function () {
          return $http.get(endpoint + '/workouts/', HEROKU.CONFIG);
        };

        this.getUserWorkouts = function () {
          return $http.get(endpoint + '/workouts/athlete', HEROKU.CONFIG);
        };

        this.addWorkout = function (workout) {
          return $http.post(endpoint + '/workouts', workout, HEROKU.CONFIG)
            .success( function (data) {
              // $state.go('training.workouts');
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



      }

    ]);

}());
