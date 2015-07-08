;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('UserCtrl', ['$scope', 'UserService', '$state', '$stateParams',
      function ($scope, UserService, $state, $stateParams) {

        $scope.eventSources = [{
          name: 'kelley event',
        }];


        $scope.loginUser = function (user) {
          UserService.loginUser(user);
        };

        $scope.registerUser = function (user) {
          UserService.registerUser(user);
        };

        $scope.updateUserReg = function (user) {
          UserService.updateUserReg(user);
        };

        $scope.logoutUser = function () {
          UserService.logoutUser();
        };

        $scope.toggleHide = function (element) {
          $(element).toggleClass('hide');
        };

      }

    ]);

}());
