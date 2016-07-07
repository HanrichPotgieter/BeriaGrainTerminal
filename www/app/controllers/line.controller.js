angular
    .module('app')
    .controller('LineCtrl', function ($scope,$http,$mdDialog,$mdMedia,lines,elements) {
        $scope.open = true;
        $scope.$on('$locationChangeStart', function(event) {
            $scope.open = false;
        });
        // POP UP ----------------->
        function DialogController($scope,$http, item, $mdDialog) {
        
            $scope.lineData = {
                labels: [],
                series: [[]]
            };

            $scope.lineOptions = {
                width: 300,
                height: 200,
                axisTitle: 'Flowrate',
            };

            $scope.Controlopen = true;
            $scope.cancel = function() {
                $scope.Controlopen = false;
                $mdDialog.cancel();
            };

            $scope.item = item;
            $scope.item.style = {
                "background-color" : "white",
            }
            $scope.ios = item.ios;

            if(item.type == "FB40"){
                var offsetStart = "708";
                var buffer = [];
                var counter = 0;

                $scope.flowrate = 0;
                $scope.jobWeight = 0;
                $scope.totalWeight = 0;
                $scope.weightDosed = 0;
                $scope.scaleWeight = 0;

                for(var i = 0;i<5;i++){
                    buffer[i] = {
                        DB:item.DB,
                        OFFSET:(parseInt(offsetStart) + counter)
                    }
                    counter = counter + 4;
                }
               
                var updateScaleInfo = function(){
                    for(x in buffer){
                        buffer[x].id = x;
                        $http.post("/getValue", buffer[x])
                        .success(function (data) {
                            buffer[data.id].result = data.value;
                        });
                    }

                    $scope.flowrate = buffer[0].result;
                    $scope.jobWeight = buffer[1].result;
                    $scope.totalWeight = buffer[2].result;
                    $scope.weightDosed = buffer[3].result;
                    $scope.scaleWeight = buffer[4].result;

                    $scope.lineData.labels.push('');
                    $scope.lineData.series[0].push($scope.flowrate);
                    if($scope.lineData.series[0].length > 12){
                        $scope.lineData.labels.splice(0,1);
                        $scope.lineData.series[0].splice(0,1);
                    }
                    if($scope.Controlopen){
                        setTimeout(function() {updateScaleInfo();},5000);
                    }
                }
                updateScaleInfo();
            }

            function getStatus(){
                //Update the status of the element
                $http.post("/getStatus", item)
                .success(function (data) {
                    //console.log(data);
                    $scope.item.style['background-color'] = data.color;
                    $scope.item.status = data.status;
                });  
                //Read the status of the io
                for (x in $scope.ios) {
                    $scope.ios[x].id = x;
                    $http.post("/getIoState", $scope.ios[x])
                    .success(function (data) {
                        //console.log($scope.ios[x]);

                        $scope.ios[data.id].stateDescription = data.description;
                        $scope.ios[data.id].style = {
                            "fill" : data.color
                        }
                    }); 
                }
                if($scope.Controlopen){
                    setTimeout(function() {getStatus();}, 1000);
                }
                else{
                    $mdDialog.cancel();
                }         
            }  
            getStatus();

        }

        $scope.showAdvanced = function(object) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
            controller: DialogController,
            templateUrl: './view/elementDialog.tmpl.html',
            parent: angular.element(document.body),
            locals: {
                item: object
            }
            });
        };

        function itemClicked(object){
            $scope.showAdvanced(object);
        };

        $scope.infoStatus = false;

        var getLineInfo = function(){
            var sel = d3.select(document.getElementById("image").contentDocument).selectAll("#lineProperties");
                sel.select("desc").each(function () {
                    var lineProperties = JSON.parse(this.textContent);
                    lines.setActiveLine(lineProperties);
                    $scope.sections = lines.selectedLine.sections;
                    for(x in $scope.sections)
                    {
                         $scope.sections[x].status = {
                             description: "PLC Disconnected",
                             color:"orange"
                         }
                    }
                    $scope.infoStatus = true;
                });
        }
        var selectionSize
        function changeColor() {
            var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
            
            if(sel.empty()) {
                setTimeout(changeColor, 1000);
            } else {
                if(!$scope.infoStatus)
                {
                    getLineInfo();
                }
                
                var tmp = sel.selectAll("*").select("desc").each(function () {
                       
                        if(isJsonString(this.textContent))
                        {    
                            var object = JSON.parse(this.textContent);
                            object.node = this;
                            elements.addElement(object);
                            //console.log(object)
                            object.node = this;
                            d3.select(object.node.parentNode).on("click", function($event) {
                                itemClicked(object,$event);
                            });
                            //console.log(object);
                            if(object.type != "LineParams"){
                                //setTimeout(1000);
                                /*
                                $http.post("/getStatus", object)
                                .success(function (data) {
                                    var parent = object.node.parentNode;
                                    //d3.select(parent).style('fill',data.color);
                                    //d3.select(parent).selectAll('*').style('fill',data.color).style('transition','fill 2.0s ease');
                                    //Here! Code needs to change --->

                                    ////////////////////////////WIAN CODE/////////////////////////
                                    if(object.type == "FB13" && object.description == "Way Flap")
                                    {
                                        var linkers;
                                        var squares = object.positions;
                                        var children = parent.getElementsByTagName('rect');
                                        for(var i = 0, max = squares.length; i < max; i++) 
                                        {
                                            square = squares[i];
                                            //console.log(square.link);

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
                                        d3.select(parent).style('fill',data.color);
                                        d3.select(parent).selectAll('*').style('fill',data.color).style('transition','fill 2.0s ease');
                                    }
                                    ////////////////////////////WIAN CODE/////////////////////////
                                }); 
                                */

                            }
                        };
                    }).call(function(){
                        if($scope.open)
                            setTimeout(changeColor, 2000);
                    });
                
            }
        }
        changeColor();

        function isJsonString(str) {
        try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
          
    })