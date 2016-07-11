angular
    .module('app')
    .controller('ScalesCtrl', function ($scope,scales,socket,$location){
       
        socket.on('updateScales',function(data) {
            $scope.scales = data;
        });

       $scope.init = function() {
           scales.getScales();
       }

       $scope.loadScale = function(scale){ 
           console.log(scale);
            $location.path( "/scales/" + scale._id );
       }

    })