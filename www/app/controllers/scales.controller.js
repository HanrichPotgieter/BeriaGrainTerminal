angular
    .module('app')
    .controller('ScalesCtrl', function ($scope,scales,socket){
       
        socket.on('updateScales',function(data) {
            $scope.scales = data;
        });

       //scales.getScales();

    });