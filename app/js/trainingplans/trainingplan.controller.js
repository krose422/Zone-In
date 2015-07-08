;(function (){

  'use strict';

  angular.module('PlanModule')
    .controller('PlanCtrl', ['$scope', 'PlanService', '$state', 'ngDialog', '$http', 'HEROKU',
      function ($scope, PlanService, $state, ngDialog, $http, HEROKU) {

        $scope.clickToOpen = function () {
          ngDialog.open({
            template: 'js/templates/addworkout.tpl.html',
            controller: 'PlanCtrl'
          });
        };

        $scope.addWorkout = function (workout) {
          console.log(workout);
          PlanService.addWorkout(workout);
        };

      }

    ]);

}());
