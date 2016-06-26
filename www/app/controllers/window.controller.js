angular
    .module('app')
    .controller('WindowCtrl', function ($scope,$http) {
      $scope.topDirections = ['left', 'up'];
      $scope.bottomDirections = ['down', 'right'];
      $scope.isOpen = false;
      $scope.availableModes = ['md-fling', 'md-scale'];
      $scope.selectedMode = 'md-fling';
      $scope.availableDirections = ['up', 'down', 'left', 'right'];
      $scope.selectedDirection = 'left';

      $scope.start = function(){
        var object = {
            DB:'600',
            OFFSET:'241',
            BIT:'1'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            console.log('done');
        }); 
      }

      $scope.stop = function(){
        var object = {
            DB:'600',
            OFFSET:'69',
            BIT:'7'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            console.log('done');
        }); 
      }

    })