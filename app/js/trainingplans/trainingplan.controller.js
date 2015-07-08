;(function (){

  'use strict';

  angular.module('PlanModule')
    .controller('PlanCtrl', ['$scope', 'PlanService', '$state', 'ngDialog',
      function ($scope, PlanService, $state, ngDialog) {

        $scope.clickToOpen = function () {
          ngDialog.open({
            template: 'js/templates/addworkout.tpl.html',
            controller: 'PlanCtrl'
          });
        };

        $scope.addWorkout = function (workout) {
          console.log(workout);
          // send post request
          $scope.closeThisDialog();
          $state.go('training.workouts');
        };

      }

    ]);

}());
