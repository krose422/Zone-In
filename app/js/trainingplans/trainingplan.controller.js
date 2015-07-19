;(function (){

  'use strict';

  angular.module('PlanModule')
    .controller('PlanCtrl', ['$scope', 'PlanService', 'UserService', '$state', 'ngDialog', '$http', 'HEROKU', '$compile', '$filter', '$cookies',
      function ($scope, PlanService, UserService, $state, ngDialog, $http, HEROKU, $compile, $filter, $cookies) {

        $scope.user           = $cookies.getObject('currentUser');
        $scope.workoutSteps   = [];
        // Counter to keep track of additional workout step inputs
        $scope.inputCounter   = 1;
        $scope.workouts       = [];
        $scope.list1          = [];
        $scope.list2          = [];
        $scope.list3          = [];
        $scope.list4          = [];
        $scope.list5          = [];
        $scope.list6          = [];
        $scope.list7          = [];
        $scope.list8          = [];
        $scope.list9          = [];
        $scope.list10         = [];
        $scope.list11         = [];
        $scope.list12         = [];
        $scope.list13         = [];
        $scope.list14         = [];
        $scope.list15         = [];
        $scope.list16         = [];
        // Options for length selection on workout creation
        $scope.trainingLength = [30, 45, 60, 75, 90, 105, 120, 150, 180];
        // Get current training plan from cookies
        $scope.currentTrainingPlan = $cookies.getObject('currentPlan');
        //
        $scope.planWorkouts = {
          // workoutIds: [],
          workoutDates: []
        };

        // Constructors
        var PlanWorkout = function (options) {
          this.workout_id = options.workout_id,
          this.workout_dates = options.workout_dates
        };

        var TrainingPlanWorkouts = function (options) {
          this.plan_id = $scope.currentTrainingPlan.id,
          this.workouts = $scope.workouts
        };

        // Declare and populate completed and incompleted training plan arrays
        var _completionPlans = function () {
          $scope.completedPlans = _.filter($scope.trainingPlans, function (plan) {
            return plan.completion === true;
          });

          $scope.incompletePlans = _.filter($scope.trainingPlans, function (plan) {
            return plan.completion === false;
          });
        };

        // Getting and manipulating training plan data
        var _getPlanWorkouts = function () {
          PlanService.getPlans()
            .success(function (data) {
              // Declare and populate training plans array, give it a workoutData value
              $scope.trainingPlans = _.each(data, function (plan) {
                plan.workoutData = [];
                plan.workoutData = _.filter($scope.workoutDates, function (workout) {
                  return workout.plan_id === plan.id;
                });
              });
              // Count completed and incomplete
              PlanService.countCompleted($scope.trainingPlans);
              // Set training plan completion value to true or false based on workouts completed
              PlanService.getPlanCompletion($scope.trainingPlans);
              // Declare and populate array of completed plans
              _completionPlans();
          });
        };

        // Getting user's adopted workouts, manipulating data
        var _getWorkoutDates = function () {
          PlanService.getWorkoutDates()
            .success(function (data) {
              $scope.workoutDates = data;
              // Add workout information (name, steps, etc) to the user's adopted workouts
              $scope.workoutDates = _.each($scope.workoutDates, function (workout) {
                workout.workoutInfo = _.findWhere($scope.workoutList, {id: workout.workout_id});
              });
              // Sort workouts with due dates array by due date
              $scope.workoutDates = _.sortBy($scope.workoutDates, 'do_date');
              // Declare and set array of incompleted workouts
              $scope.incompleteWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                return workout.workout_completion === false;
              });
              // Declare and set array of completed workouts
              $scope.completedWorkoutDates = _.filter($scope.workoutDates, function (workout) {
                return workout.workout_completion === true;
              });
              // Get user's training plans and connect workouts with due dates to them
              _getPlanWorkouts();
            });
        };

        // Get a user's created workouts
        PlanService.getUserWorkouts()
          .success(function (data) {
            $scope.userWorkoutList = data;
          });

        // Get full workout list for library and for setting with user's training plan data
        PlanService.getWorkouts()
          .success(function (data) {
            $scope.workoutList = data;
            // Go through workout list and set color value
            _.each($scope.workoutList, function (w) {
              // w.workoutDate = '';
              PlanService.setWorkoutColor(w);
            });
          })

          .then(function (data) {
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

        // Show sort menu in DOM
        $scope.showSortMenu = function() {
          $('.sort-dropdown').toggleClass('hide');
          $('.fa-chevron-down').toggleClass('hide');
          $('.fa-chevron-right').toggleClass('hide');
        };

        // Sort workouts in library
        $scope.sort = function(workoutList, predicate) {
          $scope.workoutList = _.sortBy(workoutList, predicate);
        };

        // Sort workouts in library and reverse array
        $scope.sortReverse = function (workoutList, predicate) {
          $scope.sortedArray = _.sortBy(workoutList, predicate);
          $scope.workoutList = $scope.sortedArray.reverse();
        };

        $scope.dropFunc = function (workout) {
          // console.log(workout);
        };

        $scope.dragStart = function (event) {
          var workoutId = $(event.currentTarget).data('id');
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

        $scope.finishTrainingPlan = function () {
          var trainingPlanWorkouts = new TrainingPlanWorkouts();
          console.log(trainingPlanWorkouts);
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
          return PlanService.formatDate(date);
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

        // Check if item in training plan is completed, style
        $scope.checkCompletion = function (completion) {
          if (completion === true) {
            return 'completed-style';
          }
        };

        // Check if item in training plan is completed, style image
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

      }

    ]);

}());
