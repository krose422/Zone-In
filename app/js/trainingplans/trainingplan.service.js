;(function (){

  'use strict';

  angular.module('PlanModule')
    .service('PlanService', ['$http', 'HEROKU', '$state', '$compile', 'ngDialog',
      function ($http, HEROKU, $state, $compile, ngDialog) {

        var endpoint = HEROKU.URL;

        // Training plan constructor
        var TrainingPlan = function (options) {
          this.name = options.name;
          this.start_date = options.start_date;
          this.end_date = options.end_date;
        };

        this.addTrainingPlan = function (plan) {
          var trainingPlan = new TrainingPlan(plan);
          // console.log(trainingPlan);
          // $http.post(endpoint + '/trainingplans', plan, HEROKU.CONFIG)
            // .success( function (data) {
              $state.go('training.plan');
            // });
        };

        this.getWorkouts = function () {
          return $http.get(endpoint + '/workouts/', HEROKU.CONFIG);
        };

        this.getUserWorkouts = function () {
          return $http.get(endpoint + '/workouts/athlete', HEROKU.CONFIG);
        };

        this.addWorkout = function (workout) {
          $http.post(endpoint + '/workouts', workout, HEROKU.CONFIG)
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
