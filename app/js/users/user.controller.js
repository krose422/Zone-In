;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('UserCtrl', ['$scope', 'UserService', '$state',
      function ($scope, UserService, $state) {

        $scope.loginUser = function () {
          console.log('logging in');
          $state.go('dashboard');
        };

        $scope.registerUser = function () {
          console.log('registering user');
          $state.go('home.register.welcome');
        };

        $scope.updateUserInfo = function () {
          console.log('updating user info');
          $state.go('dashboard');
        };

        $scope.logoutUser = function () {
          console.log('logging out');
          $state.go('home');
        };

        $scope.toggleHide = function () {
          $('.team-list-ul').toggleClass('hide');
        };


      }

    ]);

}());
