;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('UserCtrl', ['$cookies', '$rootScope', '$scope', 'UserService', '$state', '$stateParams',
      function ($cookies, $rootScope, $scope, UserService, $state, $stateParams) {

        console.log($rootScope.myApp);

        $scope.eventSources = [{

        }];

        $scope.interests = [
          'Rugby',
          'Lacrosse',
          'Running'
        ];

        $scope.user = $cookies.getObject('currentUser');

        $scope.userInterests = {
          interests: []
        };

        $scope.loginUser = function (user) {
          UserService.loginUser(user)
            .then( function (data) {
              // $scope.user = data.data;
              // console.log($scope.user);
            });
        };

        $scope.registerUser = function (user) {
          UserService.registerUser(user);
        };

        $scope.updateUserReg = function (user) {
          // user.interests = $scope.userInterests.interests;
          // console.log(user);
          UserService.updateUserReg(user);
        };

        $scope.logoutUser = function () {
          UserService.logoutUser();
        };

        $scope.toggleHide = function () {
          // $(element).toggleClass('hide');
          // $(event.target).toggleClass('hide');

          $(event.target).siblings().not('h4').toggleClass('hide');
          $(event.target).toggleClass('hide');
        };


        // $scope.checkAll = function() {
        //   $scope.user.interests = angular.copy($scope.interests);
        // };
        // $scope.uncheckAll = function() {
        //   $scope.user.interests = [];
        // };
        // $scope.checkFirst = function() {
        //   $scope.user.interests.splice(0, $scope.user.interests.length);
        //   $scope.user.interests.push('guest');
        // };

      }

    ]);

}());
