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

              $scope.trainingPlans = _.each($scope.trainingPlans, function (plan) {
              plan.workoutData = [];

                plan.workoutData = _.filter($scope.workoutDates, function (workout) {
                  return workout.plan_id === plan.id;
                });

              });

              console.log($scope.trainingPlans);
              PlanService.countCompleted($scope.trainingPlans);
              PlanService.getPlanCompletion($scope.trainingPlans);
              _completionPlans();
          });
        };

          var _getWorkoutDates = function () {
            PlanService.getWorkoutDates()
              .success(function (data) {
                $scope.workoutDates = data;
                $scope.workoutDates = _.each($scope.workoutDates, function (workout) {
                  // workout.do_date = PlanService.formatDate(workout.do_date);
                  workout.workoutInfo = _.findWhere($scope.workoutList, {id: workout.workout_id});

                // var workoutEvent = new PlanService.WorkoutEvent(workout.workoutInfo.name, workout.do_date, workout.do_date, workout.workoutInfo.color);
                // $scope.events.push(workoutEvent);

                });
                $scope.workoutDates = _.sortBy($scope.workoutDates, 'do_date');
                $scope.incompleteWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                  return workout.workout_completion === false;
                });
                // console.log($scope.incompleteWorkoutDates);

                // _getWeekWorkouts();

                $scope.completedWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                  return workout.workout_completion === true;
                });

                // console.log($scope.completedWorkoutDates.length);

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
            _getWorkoutDates();
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
          var formattedDate = momentDate.format('ddd, MMM DD');
          return formattedDate;
        };

        $scope.completeWorkout = function (workout) {
          console.log(workout);
          console.log(workout.id);
          console.log(workout.completion);
          PlanService.completeWorkout(workout.id, workout.completion, workout.run_distance, workout.run_time)
            .then( function (data) {
              $scope.closeThisDialog();
              $state.reload();
            });
          // console.log(event.target);
          // $('.completed-overlay').addClass('completed-style');
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

        $scope.openPlanWorkoutModal = function (workout) {
          PlanService.openPlanWorkoutModal(workout);
        };

        $scope.workoutSteps = [];

        // Counter to keep track of additional workout step inputs
        $scope.inputCounter = 1;

        // Send workout to database
        $scope.addWorkout = function (workout, steps) {
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

        $scope.checkCompletion = function (completion) {
          if (completion === true) {
            return 'completed-style';
          }
        };

        $scope.checkCompletionImg = function (completion) {
          if (completion === true) {
            return 'completed-image';
          }
        };

        $scope.checkTypeRunning = function (workout) {
          // console.log(workout.workoutInfo.running);
          if (workout.workoutInfo.running === null) {
            return '';
          }
          if (workout.workoutInfo.running === true) {
            return 'Distance: ' + workout.run_distance + ' | ' + 'Time: ' + workout.run_time;
          }
        };

        $scope.checkTypeWeights = function (workout) {
          if (workout.workoutInfo.weightlifting === true) {
            return 'Weight: ' + workout.lift_weight + 'Reps: ' + workout.lift_reps;
          }
        };

        var _completionPlans = function () {
          $scope.completedPlans = _.filter($scope.trainingPlans, function (plan) {
            return plan.completion === true;
          });

          $scope.incompletePlans = _.filter($scope.trainingPlans, function (plan) {
            return plan.completion === false;
          });
        };

        $scope.getCompletedPercent = function (plan) {
          var percentage = (plan.completedCount / plan.workoutData.length) * 100;
          return Math.round(percentage);
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
