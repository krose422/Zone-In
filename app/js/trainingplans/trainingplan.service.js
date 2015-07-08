;(function (){

  'use strict';

  angular.module('PlanModule')
    .service('PlanService', ['$http', 'HEROKU',
      function ($http, HEROKU) {

        var endpoint = HEROKU.URL;

        this.addWorkout = function (workout) {
          $http.post(endpoint + '/workouts', workout, HEROKU.CONFIG)
            .success( function (data) {
              console.log(data);
              $scope.closeThisDialog();
              $state.go('training.workouts');
            });
        };


      }

    ]);

}());
