;(function (){

  'use strict';

  angular.module('ZoneInApp', ['ui.router', 'UserModule', 'TeamModule', 'PlanModule', 'ngCookies', 'ngDialog', 'checklist-model', 'angular-progress-arc'])

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

          .state('home.demo', {
            url: 'demologin',
            templateUrl: 'js/templates/demologin.tpl.html',
            controller: 'UserCtrl'
          })

          .state('home.register', {
            url: 'register',
            templateUrl: 'js/templates/register.tpl.html',
            controller: 'UserCtrl'
          })

          .state('welcome', {
            url: '/welcomeinfo',
            templateUrl: 'js/templates/welcome.tpl.html',
            controller: 'UserCtrl'
          })

          .state('dashboard', {
            url: '/dash',
            templateUrl: 'js/templates/dashboard.tpl.html',
            controller: 'DashboardCtrl'
          })

          .state('dashboard.calendar', {
            url: '/calendar',
            templateUrl: 'js/templates/calendar.tpl.html',
            controller: 'CalendarCtrl'
          })

          .state('training', {
            url: '/training',
            templateUrl: 'js/templates/trainingplans.tpl.html',
            controller: 'PlanCtrl'
          })

          .state('training.workouts', {
            url: '/workouts',
            templateUrl: 'js/templates/workouts.tpl.html',
            controller: 'PlanCtrl'
          })

          .state('training.allplans', {
            url: '/allplans',
            templateUrl: 'js/templates/allplans.tpl.html',
            controller: 'PlanCtrl'
          })

          .state('training.plan', {
              url: '/plan',
              templateUrl: 'js/templates/planning.tpl.html',
              controller: 'PlanCtrl'
          })

          .state('team', {
            url: '/teamtemplate',
            templateUrl: 'js/templates/team.tpl.html',
            controller: 'TeamCtrl'
          })

          .state('team.directory', {
            url: '/directory',
            templateUrl: 'js/templates/teamdirectory.tpl.html',
            controller: 'TeamCtrl'
          })

          .state('team.calendar', {
            url: '/calendar',
            templateUrl: 'js/templates/teamcalendar.tpl.html',
            controller: 'TeamCtrl'
          })

          .state('team.media', {
            url: '/media',
            templateUrl: 'js/templates/teammedia.tpl.html',
            controller: 'TeamCtrl'
          });

      }

    ])

    .run(['$rootScope', 'UserService', '$stateParams', '$state', '$cookies',

      function ($rootScope, UserService, $stateParams, $state, $cookies) {

        $rootScope.$on('$stateChangeSuccess', function () {

          if($state.includes('home')){
            UserService.homeCheckLogin();
          } else {
            UserService.checkLogin();
          }

        });
      }

    ]);


}());
