;(function (){

  'use strict';

  angular.module('UserModule')
    .service('UserService', ['$rootScope', 'HEROKU', '$http', '$cookies', '$state',
      function ($rootScope, HEROKU, $http, $cookies, $state) {

        var endpoint = HEROKU.URL;

        var isLoggedIn;


        // On successful registration, set cookies, update headers, route to welcom
        var _successReg = function (data) {
          _putCookies(data);
          _updateConfig(data);
          $state.go('welcome');
        };

        // On successful login, set cookies, update headers, route to dash
        var _successLog = function (data) {
          console.log('successful login');
          _putCookies(data);
          _updateConfig(data);
          $state.go('dashboard');
        };

        // Set cookies for user
        var _putCookies = function (data) {
          $cookies.put('access_token', data.access_token);
          $cookies.putObject('currentUser', data);
        };

        // Update headers with access token
        var _updateConfig = function (user) {
          HEROKU.CONFIG.headers['access_token'] = user.access_token;
        };

        // User constructor
        var User = function (options) {
          this.email = options.email;
          this.username = options.username;
          this.password = options.password;
        };

        // Add/register new user
        this.registerUser = function (newUser) {
          var user = new User(newUser);
          return $http.post(endpoint + '/athletes/signup', user)
            .success( function (data) {
              _successReg(data);
            });
        };

        // Update user data from welcome page after initial registration page
        this.updateUserReg = function (user) {
          return $http.patch(endpoint + '/athletes/register', user, HEROKU.CONFIG)
            .success( function (data) {
              $state.go('dashboard');
            });
        };

        // Log in user
        this.loginUser = function (user) {
          return $http.post(endpoint + '/athletes/signin', user)
            .success( function (data) {
              _successLog(data);
              // $rootScope.myApp = {
              //   user: data
              // }
            });
        };

        // Log out user - remove all cookies
        this.logoutUser = function () {
          $cookies.remove('access_token');
          $cookies.remove('currentUser');
          HEROKU.CONFIG.headers['access_token'] = '';
          $state.go('home');
        };

        // If visitor routes to home page and is logged in, route to dashboard
        this.homeCheckLogin = function () {
          isLoggedIn = $cookies.get('access_token') !== undefined;
          if (isLoggedIn) {
            $state.go('dashboard');
          }
        };

        // If user is not logged in and tries to navigate inside app, routes home
        this.checkLogin = function () {
          var accessToken = $cookies.get('access_token');
          isLoggedIn = $cookies.get('access_token') !== undefined;
          if (isLoggedIn !== true) {
            $state.go('home');
          } else {
            HEROKU.CONFIG.headers['access_token'] = accessToken;
          }
        };

      }

    ]);

}());
