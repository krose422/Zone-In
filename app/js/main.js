;(function (){

  'use strict';

  angular.module('ZoneInApp', ['ui.router', 'UserModule', 'TeamModule', 'PlanModule', 'ngCookies'])

    .constant('HEROKU', {
      URL: 'https://thawing-mountain-6062.herokuapp.com',
      CONFIG: {
        headers: {
          'access_token': ''
        }
      }
    })

    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'js/templates/homepage.tpl.html',
            controller: 'UserCtrl'
          })

          .state('home.login', {
            url: 'login',
            templateUrl: 'js/templates/login.tpl.html',
            controller: 'UserCtrl'
          })

          .state('home.register', {
            url: 'register',
            templateUrl: 'js/templates/register.tpl.html',
            controller: 'UserCtrl'
          })

          .state('home.register.welcome', {
            url: '/userinfo',
            templateUrl: 'js/templates/welcome.tpl.html',
            controller: 'UserCtrl'
          })

          .state('dashboard', {
            url: '/dash',
            templateUrl: 'js/templates/dashboard.tpl.html',
            controller: 'UserCtrl'
          })

          .state('calendar', {
            url: '/calendar',
            templateUrl: 'js/templates/calendar.tpl.html',
            controller: 'PlanCtrl'
          })

          .state('trainingplans', {
            url: '/training-plans',
            templateUrl: 'js/templates/trainingplans.tpl.html',
            controller: 'PlanCtrl'
          })

          .state('workoutplans', {
            url: '/workouts',
            templateUrl: 'js/templates/workouts.tpl.html',
            controller: 'PlanCtrl'
          })

          .state('team', {
            url: '/teamtemplate',
            templateUrl: 'js/templates/team.tpl.html',
            controller: 'TeamCtrl'
          });

      }

    ])

    .run(['$rootScope', 'UserService', '$stateParams', '$state',

      function ($rootScope, UserService, $stateParams, $state) {

        $rootScope.$on('$stateChangeSuccess', function () {
          // console.log($state.current);
          // UserService.checkStatus();
        });
      }

    ]);


}());
