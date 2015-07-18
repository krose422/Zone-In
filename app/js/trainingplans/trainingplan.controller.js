;(function (){

  'use strict';

  angular.module('PlanModule')
    .controller('PlanCtrl', ['$scope', 'PlanService', 'UserService', '$state', 'ngDialog', '$http', 'HEROKU', '$compile', '$filter', '$cookies',
      function ($scope, PlanService, UserService, $state, ngDialog, $http, HEROKU, $compile, $filter, $cookies) {

        $scope.user = $cookies.getObject('currentUser');

        $scope.list1 = [];
        $scope.list2 = [];
        $scope.list3 = [];
        $scope.list4 = [];
        $scope.list5 = [];
        $scope.list6 = [];
        $scope.list7 = [];
        $scope.list8 = [];
        $scope.list9 = [];
        $scope.list10 = [];
        $scope.list11 = [];
        $scope.list12 = [];
        $scope.list13 = [];
        $scope.list14 = [];
        $scope.list15 = [];
        $scope.list16 = [];

        var endpoint = HEROKU.URL;



        $scope.sortReverse = function (workoutList, predicate) {
          $scope.sortedArray = _.sortBy(workoutList, predicate);
          $scope.workoutList = $scope.sortedArray.reverse();
        };

        var _getPlanWorkouts = function () {
          PlanService.getPlans()
            .success(function (data) {
              $scope.trainingPlans = data;
              // console.log($scope.trainingPlans);

              $scope.trainingPlans = _.each($scope.trainingPlans, function (plan) {
              plan.workoutData = [];
                // console.log($scope.workoutList);
                return _.filter(plan.workouts, function (workoutId) {
                  // console.log(workoutId);
                  $scope.workoutInfo = _.findWhere($scope.workoutList, { id: workoutId });
                  // console.log($scope.workoutInfo);
                  plan.workoutData.push($scope.workoutInfo);
                  return $scope.workoutInfo;
                });
              });
              console.log($scope.trainingPlans);
          });
        };


        PlanService.getWorkouts()
          .success(function (data) {
            $scope.workoutList = data;
            // console.log($scope.workoutList);

            _.each($scope.workoutList, function (w) {
              w.workoutDate = '';

              if (w.description === 'Endurance') {
                w.color = '#2E313D';
              } else if (w.description === 'Strength') {
                w.color = '#176785';
              } else if (w.description === 'Agility') {
                w.color = '#0F4559';
              } else if (w.description === 'Speed') {
                w.color = '#BED194';
              } else if (w.description === 'Flexibility') {
                w.color = '#499989';
              } else {
                w.color = '#D0C8C5';
              }
            });
          })

          .then(function (data) {
            _getPlanWorkouts();
          });

        // Check type of workout and apply correct icon
        $scope.iconShowRunning = function (workout) {
          if (workout.running === true) {
            $('.running').removeClass('hide');
            return 'images/running_icon_white.png';
          }
        };
        $scope.iconShowSwimming = function (workout) {
          if (workout.swimming === true) {
            $('.swimming').removeClass('hide');
            return 'images/swimming_white.png';
          };
        };
        $scope.iconShowCircuit = function (workout) {
          if (workout.circuit_training === true) {
            $('.circuits').removeClass('hide');
            return 'images/circuit_white.png';
          }
        };
        $scope.iconShowCycle = function (workout) {
          if (workout.cycling === true) {
            $('.cycling').removeClass('hide');
            return 'images/cycling_white.jpg';
          }
        };
        $scope.iconShowWeights = function (workout) {
          if (workout.weightlifting === true) {
            $('.weights').removeClass('hide');
            return 'images/weight_white.png';
          }
        };

        PlanService.getUserWorkouts()
          .success(function (data) {
            $scope.userWorkoutList = data;
          });

        $scope.trainingLength = [30, 45, 60, 75, 90, 105, 120, 150, 180];

        $scope.currentTrainingPlan = $cookies.getObject('currentPlan');

        $scope.planWorkouts = {
          workoutIds: [],
          workoutDates: []
        };

        // var TrainingPlanWorkouts = function (options) {
        //   this.plan_id = $scope.currentTrainingPlan.id,
        //   this.workout_array = $scope.planWorkouts.workoutIds
        // };

        // $scope.finishTrainingPlan = function () {
        //   var trainingPlanWorkouts = new TrainingPlanWorkouts();
        //   console.log(trainingPlanWorkouts);
        //   PlanService.finishTrainingPlan(trainingPlanWorkouts);
        // };

        $scope.workouts = [];

        var PlanWorkout = function (options) {
          this.workout_id = options.workout_id,
          this.workout_dates = options.workout_dates
        };

        $scope.dropFunc = function (workout) {
          // console.log(workout);
        };

        $scope.showSortMenu = function() {
          $('.sort-dropdown').toggleClass('hide');
          $('.fa-chevron-down').toggleClass('hide');
          $('.fa-chevron-right').toggleClass('hide');
        };

        $scope.sort = function(workoutList, predicate) {
          // $(event.target).addClass('active');
          // $(event.target).siblings().removeClass('active');
          $scope.workoutList = _.sortBy(workoutList, predicate);
          // $('#active.sort').html('<p>sorted</p>');
        };

        $scope.dragStart = function (event) {
          console.log(event.currentTarget);
          var workoutId = $(event.currentTarget).data('id');
          console.log(workoutId);
          $scope.planWorkout = new PlanWorkout({workout_id: workoutId, workout_dates: []});
          $scope.workouts.push($scope.planWorkout);
          // var contain = _.contains($scope.planWorkouts.workoutIds, workoutId);
          // if (contain === false) {
          //   $scope.planWorkouts.workoutIds.push(workoutId);
          // }
        };

        $scope.addDate = function (workoutDate) {
          $scope.planWorkout.workout_dates.push(workoutDate.date);
        };

        var TrainingPlanWorkouts = function (options) {
          this.plan_id = $scope.currentTrainingPlan.id,
          this.workouts = $scope.workouts
        };

        $scope.finishTrainingPlan = function () {
          var trainingPlanWorkouts = new TrainingPlanWorkouts();
          PlanService.finishTrainingPlan(trainingPlanWorkouts);
        }

        $scope.deleteWorkout = function (workoutId) {
          $scope.workouts = _.filter($scope.workouts, function (workout) {
            return workout.workout_id !== workoutId;
          });
          console.log($scope.workouts);
          $(event.target).parentsUntil('li').parent().remove();
        };

        $scope.formatDate = function (date) {
          var momentDate = moment(date);
          var formattedDate = momentDate.format('MMM DD, YYYY');
          return formattedDate;
        };

        $scope.completeWorkout = function (workout) {
          console.log(workout);
          // PlanService.completeWorkout(workout);
        };

        $scope.completePlan = function (trainingPlan) {
          console.log(trainingPlan);
          PlanService.completePlan(trainingPlan);
        };

        $scope.logoutUser = function () {
          UserService.logoutUser();
        };

        $scope.clickToOpenAddW = function () {
          PlanService.clickToOpenAddW();
        };

        $scope.clickToOpenAddT = function () {
          PlanService.clickToOpenAddT();
        };

        $scope.openWorkoutModal = function (workout) {
          PlanService.openWorkoutModal(workout);
        };

        $scope.workoutSteps = [];

        // Counter to keep track of additional workout step inputs
        $scope.inputCounter = 1;

        // Send workout to database
        $scope.addWorkout = function (workout, steps) {
          // console.log(workout);
          // $scope.workoutSteps.push(steps.first, steps.second, steps.third);
          // workout.steps = $scope.workoutSteps;

          PlanService.addWorkout(workout)
            .then( function (data) {
              $scope.closeThisDialog();
            });
        };

        $scope.addTrainingPlan = function (plan) {
          PlanService.addTrainingPlan(plan)
            .then( function (data) {
              $state.go('training.plan');
              $scope.closeThisDialog();
            });
        };

        // Add prefix to input on focus
        $scope.addPrefix = function (prefix) {
          $(event.target).val(prefix);
        };

        $scope.expand = function () {
          $(event.target).siblings().not('.top').toggleClass('hide');
          $(event.target).toggleClass('hide');
        };

        $scope.removeAlert = function () {
          UserService.removeAlert();
        };

        // $scope.checkAll = function() {
        //   $scope.user.interests = angular.copy($scope.interests);
        // };
        // $scope.uncheckAll = function() {
        //   $scope.user.interests = [];
        // };


        // [{"plan_id":25,"workout_id":8,"workout_interval":null,"id":41},
        // {"plan_id":25,"workout_id":12,"workout_interval":null,"id":42},
        // {"plan_id":25,"workout_id":15,"workout_interval":null,"id":43},
        // {"athlete_id":2,"workout_id":8,"id":43,"workout_completion":false,"do_date":"2015-07-15T04:00:00.000Z"},
        // {"athlete_id":2,"workout_id":8,"id":44,"workout_completion":false,"do_date":"2015-07-30T04:00:00.000Z"},
        // {"athlete_id":2,"workout_id":12,"id":45,"workout_completion":false,"do_date":"2015-07-20T04:00:00.000Z"},
        // {"athlete_id":2,"workout_id":12,"id":46,"workout_completion":false,"do_date":"2015-07-22T04:00:00.000Z"},
        // {"athlete_id":2,"workout_id":12,"id":47,"workout_completion":false,"do_date":"2015-07-30T04:00:00.000Z"},
        // {"athlete_id":2,"workout_id":15,"id":48,"workout_completion":false,"do_date":"2015-08-11T04:00:00.000Z"},
        // {"athlete_id":2,"workout_id":15,"id":49,"workout_completion":false,"do_date":"2015-08-20T04:00:00.000Z"},
        // {"athlete_id":2,"workout_id":15,"id":50,"workout_completion":false,"do_date":"2015-08-25T04:00:00.000Z"}]


      }

    ]);

}());
