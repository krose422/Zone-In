;(function (){

  'use strict';

  angular.module('ZoneInApp', ['ui.router'])

    // .constant('HEROKU', {
    //   URL: 'https://api.parse.com/1/',
    //   CONFIG: {
    //     headers: {

    //     }
    //   }
    // })

    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state('home', {
            url: '',
            templateUrl: 'js/templates/homepage.tpl.html',
            controller: 'UserCtrl'
          })

          .state('login', {
            url: '/login',
            templateUrl: 'js/templates/login.tpl.html',
            controller: 'UserCtrl'
          })

          .state('register', {
            url: '/register',
            templateUrl: 'js/templates/register.tpl.html',
            controller: 'UserCtrl'
          });

      }

    ]);

}());
