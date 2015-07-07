;(function (){

  'use strict';

  angular.module('UserModule')
    .service('UserService', ['HEROKU', '$http', '$cookies', '$state',
      function (HEROKU, $http, $cookies, $state) {

        var endpoint = HEROKU.URL;

        var _successReg = function (data) {
          $cookies.put('access_token', data.access_token);
          $cookies.putObject('currentUser', data);
          HEROKU.CONFIG.headers['access_token'] = data.access_token;
          $state.go('home.register.welcome');
        };

        var _successLog = function (data) {
          console.log('successful login');

          $cookies.put('access_token', data.access_token);
          $cookies.putObject('currentUser', data);
          _updateConfig(data);
        };

        var _updateConfig = function (user) {
          HEROKU.CONFIG.headers['access_token'] = user.access_token;
          $state.go('dashboard');
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

        this.updateUserReg = function (user) {
          // var currentUser = $cookies.get('currentUser');
          // console.log(currentUser);
          // console.log(user);
          return $http.patch(endpoint + '/athletes/register', user, HEROKU.CONFIG)
            .success( function (data) {
              console.log(data);
              // $state.go('dashboard');
            });
        };

        this.loginUser = function (user) {
          return $http.post(endpoint + '/athletes/signin')
            .success( function (data) {
              _successLog(data);
            });
        };

        this.logoutUser = function () {
          $cookies.remove('access_token');
          $cookies.remove('currentUser');
          HEROKU.CONFIG.headers['access_token'] = '';
          $state.go('home');
        };

        this.checkStatus = function () {
          var user = $cookies.getObject('currentUser');
          var token = $cookies.get('access_token');
          var LoggedIn = token !== undefined;
            // if (!LoggedIn) {
            //   $state.go('home');
            // }

          if (user !== undefined) {
            _updateConfig(user);
          } else {
            $state.go('home.login');
          }
        };


      }

    ]);

}());
