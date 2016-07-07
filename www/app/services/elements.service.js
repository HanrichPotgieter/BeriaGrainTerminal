angular
    .module('app')
    .factory('elements', function($http) {
    function isJsonString(str) {
    try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    var socket = io();
    var elements = {
        addElement:function(element) {
            //debugger;
            socket.emit('addElement',element);
            socket.on(element.name,function(data) {
                //console.log(data.element);
                var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
                sel.selectAll("*").select("desc").each(function () {
                    if(isJsonString(this.textContent)){
                        var object = JSON.parse(this.textContent);
                        if(object.name == data.element.name)
                        {
                            d3.select(this.parentNode).selectAll('*').style('fill',data.status.color).style('transition','fill 2.0s ease');
                        }
                    }
                });
                
            });
        }  
    };
     
    return elements;
    });