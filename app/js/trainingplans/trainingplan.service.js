;(function (){

  'use strict';

  angular.module('PlanModule')
    .service('PlanService', ['$http', 'HEROKU', '$state', '$compile', 'ngDialog', '$cookies',
      function ($http, HEROKU, $state, $compile, ngDialog, $cookies) {

        var endpoint = HEROKU.URL;

        // Training plan constructor
        var TrainingPlan = function (options) {
          this.name = options.name,
          this.description = options.description,
          this.start_date = options.start_date,
          this.end_date = options.end_date
        };

        this.formatDate = function (date) {
          var momentDate = moment(date);
          var formattedDate = momentDate.format('MMM DD, YYYY');
          return formattedDate;
        };

          this.WorkoutEvent = function (name, start_date, end_date, color) {
            this.title = name,
            this.start = start_date,
            this.end = end_date,
            this.color = color,
            this.stick = true
          };

          this.DailyWorkout = function (day, workouts) {
            this.day = day;
            this.workouts = workouts;
          };

        this.addTrainingPlan = function (plan) {
          var trainingPlan = new TrainingPlan(plan);
          console.log(trainingPlan);
          return $http.post(endpoint + '/plans', plan, HEROKU.CONFIG)
            .success( function (data) {
              $cookies.putObject('currentPlan', data);
            })
        };

        this.finishTrainingPlan = function (trainingPlanWorkouts) {
          console.log(trainingPlanWorkouts);
          return $http.post(endpoint + '/plans/workouts', trainingPlanWorkouts, HEROKU.CONFIG)
            .success( function (data) {
              $cookies.remove('currentPlan');
              $state.go('dashboard.calendar');
              // $state.reload();
            });
        };

        this.getWorkouts = function () {
          return $http.get(endpoint + '/workouts/', HEROKU.CONFIG);
        };

        this.getPlans = function () {
          return $http.get(endpoint + '/plans/creator', HEROKU.CONFIG);
        };

        this.getUserWorkouts = function () {
          return $http.get(endpoint + '/workouts/athlete', HEROKU.CONFIG);
        };

        this.getWorkoutDates = function () {
          return $http.get(endpoint + '/plans/adopted', HEROKU.CONFIG);
        };

        this.addWorkout = function (workout) {
          return $http.post(endpoint + '/workouts', workout, HEROKU.CONFIG)
            .success( function (data) {
              $state.go('training.plan');
            });
        };

        this.completeWorkout = function (workout) {
          return $http.patch(endpoint + '/plans/completion', workout, HEROKU.CONFIG)
            .success( function (data) {
              console.log(data);
            });
        };

        this.completePlan = function (plan) {
          console.log('in service function');
          return $http.patch(endpoint + '/plans/completion', plan, HEROKU.CONFIG)
            .success (function (data) {
              console.log(data);
            });
        };

        this.clickToOpenAddW = function () {
          ngDialog.open({
            template: 'js/templates/addworkout.tpl.html',
            controller: 'PlanCtrl'
          });
        };

        this.clickToOpenAddT = function () {
          ngDialog.open({
            template: 'js/templates/addtrainingplan.tpl.html',
            controller: 'PlanCtrl'
          });
        };

        this.openWorkoutModal = function (workout) {
          ngDialog.open({
            template: 'js/templates/workoutmodal.tpl.html',
            controller: 'PlanCtrl',
            data: workout
          });
        };

        Date.prototype.addDays = function (days) {
          var d = new Date(this.valueOf())
          d.setDate(d.getDate() + days);
          return d;
        };

        this.getDates = function (startDate, stopDate) {
          var dateArray = [];
          var currentDate = startDate;
          while (currentDate <= stopDate) {
            dateArray.push(currentDate);
            currentDate = currentDate.addDays(1);
          }
          return dateArray;
        };

      }

    ]);

}());
