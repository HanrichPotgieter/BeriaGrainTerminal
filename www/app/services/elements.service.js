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

    var updateElement = function(element,index,dataArray,node){

        //d3.select(parent).style('fill',data[index].status.color);
        //d3.select(element.parentNode).selectAll('*').style('fill',data[index].status.color).style('transition','fill 2.0s ease');
        var object = element;
        var parent = node.parentNode;
        var data = dataArray[index].data;
        //debugger;
        var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
        if(element.name = '=A-1006-MXZ01')
        //debugger;
        if(object.type == "FB13" && object.description == "Way Flap")
        {
            var linkers;
            var squares = object.positions;
            var children = parent.getElementsByTagName('rect');
            for(var i = 0, max = squares.length; i < max; i++) 
            {
                square = squares[i];

                if(square.input == "YES" || "-")
                {
                    d3.select(children[i]).style('fill', data.color)
                    .style('visibility', 'visible')
                    .style('transition','fill 2.0s ease')
                    .style('opacity', '1');
                }

                if(data.status == "State High Number")
                {
                    if(square.out == "HN")
                    {
                        d3.select(children[i]).style('fill', data.color)
                        .style('visibility', 'visible')
                        .style('transition','fill 2.0s ease')
                        .style('opacity', '1');

                        if(square.link != "-")
                        {
                            linkers = sel.selectAll("#" + square.link).selectAll("path, rect").each(function()
                            {
                                d3.select(this).style('fill', data.color).style('transition','fill 2.0s ease');
                            });
                        }

                    }
                    else if(square.out == "LN")
                    {
                        d3.select(children[i]).style('fill', 'grey')
                        .style('visibility', 'visible')
                        .style('transition','fill 2.0s ease')
                        .style('opacity', '1');

                        if(square.link != "-")
                        {
                            linkers = sel.selectAll("#" + square.link).selectAll("path").each(function()
                            {
                                d3.select(this).style('fill', 'none').style('transition','fill 2.0s ease');
                            });
                        }
                    }         
                }
                else if(data.status == "State Low Number") //State Low Number
                {
                    data.color = 'green';
                    if(square.out == "LN")
                    {
                        d3.select(children[i]).style('fill', data.color)
                        .style('visibility', 'visible')
                        .style('transition','fill 2.0s ease')
                        .style('opacity', '1');

                        if(square.link != "-")
                        {
                            linkers = sel.selectAll("#" + square.link).selectAll("path").each(function()
                            {
                                d3.select(this).style('fill', data.color).style('transition','fill 2.0s ease');
                            });
                        }

                    }
                    else if(square.out == "HN")
                    {
                        d3.select(children[i]).style('fill', 'grey')
                        .style('visibility', 'visible')
                        .style('transition','fill 2.0s ease')
                        .style('opacity', '1');

                        if(square.link != "-")
                        {
                            linkers = sel.selectAll("#" + square.link).selectAll("path").each(function()
                            {
                                d3.select(this).style('fill', 'none').style('transition','fill 2.0s ease');
                            });
                        }
                    }
                }
                else
                {
                        d3.select(children[i]).style('fill', data.color)
                        .style('visibility', 'visible')
                        .style('transition','fill 2.0s ease')
                        .style('opacity', '1');     

                        if(square.link != "-")
                    {
                        linkers = sel.selectAll("#" + square.link).selectAll("path").each(function()
                        {
                            d3.select(this).style('fill', data.color).style('transition','fill 2.0s ease');
                        });
                        
                    } 
                }
            }          
                            
        }
        else{
            //d3.select(parent).style('fill',data.color);
            d3.select(parent).selectAll('*').style('fill',data.color).style('transition','fill 2.0s ease');
        }
    }

    socket.on('updateElements',function(data) {
        console.log('Updating elements');
        var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
        sel.select("desc").each(function () {
            if(isJsonString(this.textContent)){
                var element= JSON.parse(this.textContent);
                for(x in data){
                    if(data[x].name == element.name){

                        var b = JSON.parse(JSON.stringify(data[x]));
                        //Removing unesessary stuff for comaprison.
                        delete b['data'];
                        delete b['node'];
                        delete b['_id'];
                        //debugger;
                        if(JSON.stringify(b) == JSON.stringify(element)){
                            (function(x,element,data,item){
                                updateElement(item,x,data,element);
                            })(x,this,data,element); 
                        }
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
