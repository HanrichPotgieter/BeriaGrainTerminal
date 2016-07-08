angular
    .module('app')
    .factory('elements', function($http) {
    var releaseEvents = [];
 
    function isJsonString(str) {
    try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    var socket = io();

    function isJsonString(str) {
    try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    socket.on('updateElements',function(data) {
        var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
        sel.select("desc").each(function () {
            if(isJsonString(this.textContent)){
                var element= JSON.parse(this.textContent);
                for(x in data){
                    if(data[x].name == element.name){
                        d3.select(this.parentNode).selectAll('*').style('fill',data[x].status.color).style('transition','fill 2.0s ease');
                    }
                }
            }
        });
    });

    var elements = {
        addElement:function(element) {
            //debugger;
            socket.emit('addElement',element);
        }  
    };
     
    return elements;
    });
