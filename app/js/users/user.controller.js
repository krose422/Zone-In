;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('UserCtrl', ['$scope', 'UserService', '$state', '$stateParams',
      function ($scope, UserService, $state, $stateParams) {

        $scope.loginUser = function () {
          UserService.loginUser();
          // console.log('logging in');
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

        $scope.toggleHide = function () {
          $('.team-list-ul').toggleClass('hide');
        };


      }

    ]);

}());
