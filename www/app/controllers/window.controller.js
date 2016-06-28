angular
    .module('app')
    .controller('WindowCtrl', function ($scope,$http,lines,$mdDialog,$mdMedia) {
    $scope.topDirections = ['left', 'up'];
    $scope.bottomDirections = ['down', 'right'];
    $scope.isOpen = false;
    $scope.availableModes = ['md-fling', 'md-scale'];
    $scope.selectedMode = 'md-fling';
    $scope.availableDirections = ['up', 'down', 'left', 'right'];
    $scope.selectedDirection = 'left';

    $scope.start = function(){
    var object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'241',BIT:'1'};
    $http.post("/setBit", object).success(function (data) {}); 
    object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'67',BIT:'0'};
    $http.post("/setBit", object).success(function (data) {}); 
    object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'67',BIT:'1'};
    $http.post("/setBit", object).success(function (data) {});
    object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'67',BIT:'2'};
    $http.post("/setBit", object).success(function (data) {});
    };

    $scope.stop = function(){
    var object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'69',BIT:'7'};
    $http.post("/setBit", object).success(function (data) {}); 
    };

    $scope.pause = function(){
    var object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'69',BIT:'2'};
    $http.post("/setBit", object).success(function (data) {}); };

    $scope.reset = function(){
    var object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'68',BIT:'2'};
    $http.post("/setBit", object).success(function (data) {}); };

    $scope.estop = function(){
    var object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'69',BIT:'0'};
    $http.post("/setBit", object).success(function (data) {});

    var object = {DB:parseInt(lines.selectedLine.DB),OFFSET:'69',BIT:'6'};
    $http.post("/setBit", object).success(function (data) {}); 
    };

    jobDialogController = function () {
        
    }

    $scope.createJob = function(){
        $scope.showAdvanced = function(object) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
            controller: jobDialogController,
            templateUrl: './view/jobDialog.tmpl.html',
            parent: angular.element(document.body),
            locals: {
                item: object
            }
            });
        };
    }

})