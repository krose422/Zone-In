;(function (){

  'use strict';

  angular.module('PlanModule')
    .service('PlanService', ['$http', 'HEROKU', '$state', '$compile', 'ngDialog',
      function ($http, HEROKU, $state, $compile, ngDialog) {

        var endpoint = HEROKU.URL;

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

        this.addTrainingPlan = function (plan) {
          // $http.post(endpoint + '/trainingplans', plan, HEROKU.CONFIG)
            // .success( function (data) {
              $state.go('training.plan');
            // });
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
