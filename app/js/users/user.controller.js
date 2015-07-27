;(function (){

  'use strict';

  angular.module('UserModule')
    .controller('UserCtrl', ['$cookies', '$rootScope', '$scope', 'UserService', '$state', '$stateParams',
      function ($cookies, $rootScope, $scope, UserService, $state, $stateParams) {

        $scope.user = $cookies.getObject('currentUser');

        $scope.eventSources = [{
          title: 'testing event',
          allDay: true,
          start: "2015-07-20T04:00:00.000Z",
          end: "2015-07-26T04:00:00.000Z"
        }];

        $scope.interests = [
          'Rugby',
          'Lacrosse',
          'Running'
        ];

        $scope.userInterests = {
          interests: []
        };

        $scope.loginUser = function (user) {
          UserService.loginUser(user)
            .then( function (data) {
            });
        };

        $scope.registerUser = function (user) {
          UserService.registerUser(user);
        };

        $scope.updateUserReg = function (user) {
          UserService.updateUserReg(user);
        };

        // Add value to input on focus
        $scope.addValue = function (prefix) {
          $(event.target).val(prefix);
        };

        // $scope.demoLogin = function () {
        //   $state.go('home.login');
        // };
      }

    ]);

}());
