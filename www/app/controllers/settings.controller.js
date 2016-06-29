angular
    .module('app')
    .controller('SettingsCtrl', function ($scope) {
        $scope.lines = [{
                name:"Intake",
                DB:600,
                sections:[{
                    name:"Wheat intake",
                    DB:601
                }]
            },
            {
                name:"Wheat Transfer",
                DB:600,
                sections:[{
                    name:"Wheat Transfer",
                    DB:601
                }]
            }]
        $scope.toggleLine = function(line){
            if(line.show)
                line.show = false;
            else
                line.show = true;
        }
        $scope.addLine = function(line){

        }
        $scope.removeLine = function(line){
            
        }
        $scope.addSection = function(line,section){
            
        }
        $scope.removeSection = function(line,section){
            
        }
    });