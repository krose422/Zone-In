;(function (){

  'use strict';

  angular.module('PlanModule', ['ui.router',  'ui.calendar', 'ngDragDrop'])
    .directive('addInput', ['$compile',
      function ($compile) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            element.find('.addStep').bind('click', function () {
              console.log('inside directive');
              var input = angular.element('<div><input type="text" placeholder="Workout Step" ng-model="workout.steps[' + scope.inputCounter + ']" class="full-input"></div>');
              console.log(scope.inputCounter);

              var compile = $compile(input)(scope);

              element.append(input);

              scope.inputCounter++;
            });
          }
        }
      }
    ]);

}());
