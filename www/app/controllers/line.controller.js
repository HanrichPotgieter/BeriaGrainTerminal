angular
    .module('app')
    .controller('LineCtrl', function ($scope,$http,$mdDialog,$mdMedia,lines) {
        $scope.open = true;
        $scope.$on('$locationChangeStart', function(event) {
            $scope.open = false;
        });
        function DialogController($scope,$http, item, $mdDialog) {
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
                    setTimeout(function() {getStatus();}, 200);
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

        function changeColor() {
            var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
            //console.log(sel);
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
                            //console.log(object)
                            object.node = this;
                            d3.select(object.node.parentNode).on("click", function($event) {
                                itemClicked(object,$event);
                            });
                            //console.log(object);
                            if(object.type != "LineParams"){
                                //setTimeout(1000);
                                $http.post("/getStatus", object)
                                .success(function (data) {
                                    var parent = object.node.parentNode;
                                    d3.select(parent).style('fill',data.color);
                                    d3.select(parent).selectAll('*').style('fill',data.color).style('transition','fill 2.0s ease');
                                }); 
                            }
                        };
                    }).call(function(){
                        if($scope.open)
                            setTimeout(changeColor, 1000);
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