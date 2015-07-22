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
          var formattedDate = momentDate.format('ddd | MMM DD, YY');
          return formattedDate;
        };

        this.formatDateSmall = function (date) {
          var momentDate = moment(date);
          var formattedDate = momentDate.format('MM/DD');
          return formattedDate;
        };

        this.formatDateLarge = function (date) {
          var momentDate = moment(date);
          var formattedDate = momentDate.format('MMM DD, YYYY');
          return formattedDate;
        };

        this.WorkoutEvent = function (name, start_date, end_date, color) {
          this.title = name,
          this.start = start_date,
          this.end = end_date,
          this.color = color,
          this.stick = true,
          this.allDay = true
        };

        this.DailyWorkout = function (day, workouts) {
          this.day = day;
          this.workouts = workouts;
        };

        this.addTrainingPlan = function (plan) {
          var trainingPlan = new TrainingPlan(plan);
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
            });
        };

        this.getWorkouts = function () {
          return $http.get(endpoint + '/workouts/', HEROKU.CONFIG);
        };

        this.getPlans = function () {
          return $http.get(endpoint + '/plans/creator', HEROKU.CONFIG);
        };

        this.getAllPlans = function () {
          return $http.get(endpoint + '/plans', HEROKU.CONFIG);
        };

        this.getUserWorkouts = function () {
          return $http.get(endpoint + '/workouts/athlete', HEROKU.CONFIG);
        };

        this.getWorkoutDates = function () {
          return $http.get(endpoint + '/plans/adopted', HEROKU.CONFIG);
        };

        this.addWorkout = function (workout) {
          return $http.post(endpoint + '/workouts', workout, HEROKU.CONFIG);
        };

        this.completeWorkout = function (id, completion, runDistance, runTime, date) {
          console.log(date);
          return $http.patch(endpoint + '/plans/workout_completion', {athlete_workout_id: id, completion: completion, run_distance: runDistance, run_time: runTime, completion_date: date}, HEROKU.CONFIG)
            .success( function (data) {
            });
        };

        this.completePlan = function (plan) {
          console.log(plan.completion);
          // console.log('in service function');
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

        this.openPlanWorkoutModal = function (workout) {
          ngDialog.open({
            template: 'js/templates/planworkoutmodal.tpl.html',
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

        this.countCompleted = function (trainingPlans) {
          return _.each(trainingPlans, function (plan) {
            plan.completedCount = 0;
            plan.incompleteCount = 0;
            _.each(plan.workoutData, function (workout) {
              if (workout.workout_completion === true) {
                plan.completedCount ++;
              } else if (workout.workout_completion === false) {
                plan.incompleteCount ++;
              }
            });
          });
        };

        this.getPlanCompletion = function (trainingPlans) {
          return _.each(trainingPlans, function (plan) {
            if (plan.completedCount === plan.workoutData.length) {
              plan.completion = true;
            } else {
              plan.completion = false;
            }
          });
        };

        this.setWorkoutColor = function (workout) {
          if (workout.description === 'Endurance') {
            return workout.color = '#2E313D';
          } else if (workout.description === 'Strength') {
            return workout.color = '#176785';
          } else if (workout.description === 'Agility') {
            return workout.color = '#0F4559';
          } else if (workout.description === 'Speed') {
            return workout.color = '#BED194';
          } else if (workout.description === 'Flexibility') {
            return workout.color = '#499989';
          } else {
            return workout.color = '#D0C8C5';
          }
        };

        this.sortRequest = function (description) {
          $http.post(endpoint + '/workouts/description', {description: description}, HEROKU.CONFIG)
            .success( function (data) {
              console.log(data);
            });
        };

        this.sortCategory = function () {
          $http.post(endpoint + '/workouts/category', {circuit_training: true}, HEROKU.CONFIG)
            .success( function (data) {
              console.log(data);
            });
        };


      }

    ]);

}());
