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

    var updateElement = function(element,index,data){
        var color = data[index].status.color;
        d3.select(element.parentNode).selectAll('*').style('fill',color).style('transition','fill 2.0s ease');
    }

    socket.on('updateElements',function(data) {
        console.log('Updating elements');
        var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
        sel.select("desc").each(function () {
            if(isJsonString(this.textContent)){
                var element= JSON.parse(this.textContent);
                for(x in data){
                    //console.log(data[x]);
                    if(data[x].name == element.name){
                        updateElement(this,x,data);
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
