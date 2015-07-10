// ;(function (){

//   'use strict';

//   angular.module('PlanModule')
//     .directive ('datepicker', function () {
//       return {
//         restrict: 'A',
//         require : 'ngModel',
//         link : function (scope, element, attrs, ngModelCtrl) {
//             $(function(){
//                 element.datepicker({
//                     dateFormat:'mm/dd/yy',
//                     onSelect:function (date) {
//                         scope.$apply(function () {
//                             ngModelCtrl.$setViewValue(date);
//                         });
//                     }
//                 });
//             });
//         }
//       };
//     })

//   );

// }());
