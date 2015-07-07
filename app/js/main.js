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

    .run(['$rootScope', 'UserService', '$stateParams', '$state', '$cookies',

      function ($rootScope, UserService, $stateParams, $state, $cookies) {

        $rootScope.$on('$stateChangeSuccess', function () {

          console.log($state.current.name);

          var isLoggedIn;

          var homeCheckLogin = function () {
            isLoggedIn = $cookies.get('access_token') !== undefined;
            if (isLoggedIn) {
              $state.go('dashboard');
            }
          };

          var checkLogin = function () {
            isLoggedIn = $cookies.get('access_token') !== undefined;
            if (isLoggedIn !== true) {
              $state.go('home');
            }
          };

          if ($state.current.name === 'home') {
            homeCheckLogin();
          }
          if ($state.current.name === 'home.login') {
            homeCheckLogin();
          }
          if ($state.current.name === 'home.register') {
            homeCheckLogin();
          }
          if ($state.current.name === 'home.register.welcome') {
            homeCheckLogin();
          }

          // if current state is not login or register or home, check if logged in and if not, route home
          if ($state.current.name === 'home.login') {
            console.log('ok');
          } else {
            checkLogin();
          }

          // UserService.checkStatus();
        });
      }

    ]);


}());
