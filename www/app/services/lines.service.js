angular
    .module('app')
    .factory('lines', function($http) {

    var lines = {
        selectedLine:{
            name:'Unknown'
        },
        setActiveLine:function(line){
            lines.selectedLine = line;
        },
        updateSections:function(){
            for(x in lines.selectedLine.sections){
                var object = lines.selectedLine.sections[x];
                object.id = x;
                $http.post("/getSectionStatus", object)
                .success(function (data) {
                    lines.selectedLine.sections[data.id].status = data;
                    lines.selectedLine.sections[data.id].style = {
                        "background" : data.color
                    }
                }); 
            }   
        }
    };
    
    return lines;
    });
