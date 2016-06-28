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

    jobDialogController = function ($scope,$http,lines,$mdToast) {
        $scope.cancel = function() {
            $scope.Controlopen = false;
            $mdDialog.cancel();
        };
        //Mock data.. 
        $scope.sendRcvList = [
            {
                "name":"Truck/Ship",
                "offset":"816",
                "bins":[
                    {
                        "name":"Ship Intake",
                        number:500
                    },
                    {
                        "name":"Rail/Truck Intake",
                        "number":"501"
                    }
                ]
            },
            {
                "name":"Silo",
                "offset":"894",
                "bins":[
                    {
                        "name":"Product Silo",
                        "number":"1"
                    },
                    {
                        "name":"Product Silo",
                        "number":"2"
                    }
                ]
            }
        ];

        $scope.downloadJob = function() {
            for(x in $scope.sendRcvList){
                var items = $scope.sendRcvList[x].bins;
                downloadBins(items,$scope.sendRcvList[x].offset);
            }
        }

        var downloadBins = function(list,offset){
            var counter = 0;
            for(y in list){
                var bin = list[y];
                var binData = bin;
                binData.DB = parseInt(lines.selectedLine.DB);
                binData.OFFSET = parseInt(offset) + counter;
                if(bin.selected){
                    $http.post("/writeBin",binData).success(function (data) {
                        console.log(data);
                    });
                    counter++;
                }
                else{
                    binData.number = 0;
                    $http.post("/writeBin",binData).success(function (data) {
                        console.log(data);
                    });
                    counter++;
                }
            }
        }

    }

    $scope.createJob = function(object) {
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

})