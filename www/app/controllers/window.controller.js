angular
    .module('app')
    .controller('WindowCtrl', function ($scope,$http,lines) {
      $scope.topDirections = ['left', 'up'];
      $scope.bottomDirections = ['down', 'right'];
      $scope.isOpen = false;
      $scope.availableModes = ['md-fling', 'md-scale'];
      $scope.selectedMode = 'md-fling';
      $scope.availableDirections = ['up', 'down', 'left', 'right'];
      $scope.selectedDirection = 'left';

      $scope.start = function(){

        var object = {
            DB:parseInt(lines.selectedLine.DB),
            OFFSET:'241',
            BIT:'1'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            //console.log('done');
        }); 

        object = {
            DB:parseInt(lines.selectedLine.DB),
            OFFSET:'67',
            BIT:'0'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            //console.log('done');
        }); 

        object = {
            DB:parseInt(lines.selectedLine.DB),
            OFFSET:'67',
            BIT:'1'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            //console.log('done');
        });

        object = {
            DB:parseInt(lines.selectedLine.DB),
            OFFSET:'67',
            BIT:'2'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            //console.log('done');
        });

      };

      $scope.stop = function(){
        var object = {
            DB:parseInt(lines.selectedLine.DB),
            OFFSET:'69',
            BIT:'7'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            //console.log('done');
        }); 
      };

      $scope.pause = function(){
        var object = {
            DB:parseInt(lines.selectedLine.DB),
            OFFSET:'69',
            BIT:'2'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            //console.log('done');
        }); 
      };

      $scope.reset = function(){
        var object = {
            DB:parseInt(lines.selectedLine.DB),
            OFFSET:'68',
            BIT:'2'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            //console.log('done');
        }); 
      };

    })