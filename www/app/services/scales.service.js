angular
    .module('app')
    .factory('scales', function($http,socket) {
    var scalesList= [];
    var loadScales = function(){
        socket.emit('getScales');
    }
    loadScales();
    socket.on('updateScales',function(data) {
        //cosnole.log('Updating Scales')
        scalesList = data;
    });

    var scales = {
        getScales:function(){
            loadScales();
        }
    }
    return scales;
    });
