angular
    .module('app')
    .factory('lines', function() {

    var lines = {
        selectedLine:{
            name:'Unknown'
        },
        setActiveLine:function(line){
            lines.selectedLine = line;
        }
    };

    return lines;

    });
