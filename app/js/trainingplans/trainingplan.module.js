;(function (){

  'use strict';

  angular.module('PlanModule', ['ui.router',  'ui.calendar', 'ngDragDrop']);
    // .directive ('datepicker', function () {
    //   return {
    //     restrict: 'A',
    //     require : 'ngModel',
    //     link : function (scope, element, attrs, ngModelCtrl) {
    //         $(function(){
    //             element.datepicker({
    //                 dateFormat:'dd/mm/yy',
    //                 onSelect:function (date) {
    //                     scope.$apply(function () {
    //                         ngModelCtrl.$setViewValue(date);
    //                     });
    //                 }
    //             });
    //         });
    //     }
    //   };
    // });

}());
