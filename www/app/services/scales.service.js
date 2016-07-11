angular
    .module('app')
    .factory('scales', function($http) {
    var scalesList= [{name:'Intake'}];

    var scales = {
        getScales:function(){
            return scalesList
        }
    };
    
    return scales;
    });
