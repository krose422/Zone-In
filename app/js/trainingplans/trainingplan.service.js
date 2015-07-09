;(function (){

  'use strict';

  angular.module('PlanModule')
    .service('PlanService', ['$http', 'HEROKU', '$state',
      function ($http, HEROKU, $state) {

        var endpoint = HEROKU.URL;

        this.addWorkout = function (workout) {
          $http.post(endpoint + '/workouts', workout, HEROKU.CONFIG)
            .success( function (data) {
              console.log(data);
              $state.go('training.workouts');
            });
        };


      }

    ]);

}());
