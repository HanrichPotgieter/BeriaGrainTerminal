angular
    .module('app')
    .controller('ScalesCtrl', function ($scope,scales){
        
        $scope.scales = scales.getScales();

    });