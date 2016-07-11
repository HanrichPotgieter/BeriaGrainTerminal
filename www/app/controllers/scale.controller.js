angular
    .module('app')
    .controller('ScaleCtrl', function ($scope,scales,socket,$stateParams){
       var id = $stateParams.id;
       socket.emit('getScale',id);
    })