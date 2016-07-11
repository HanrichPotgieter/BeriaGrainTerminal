angular
    .module('app')
    .controller('ScalesCtrl', function ($scope,scales,socket){
        scales.getScales();
        socket.on('updateScales',function(data) {
            //cosole.log(data);
          
            $scope.scales = data;
        });
    });