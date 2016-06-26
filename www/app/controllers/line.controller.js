angular
    .module('app')
    .controller('LineCtrl', function ($scope,$http,$mdDialog,$mdMedia) {
        function DialogController($scope,$http, item, $mdDialog) {

            $scope.open = true;

            $scope.cancel = function() {
                $scope.open = false;
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
                if($scope.open){
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

        function changeColor() {
            var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
            if(sel.empty()) {
                //console.log('hello');
                setTimeout(changeColor, 100);
            } else {
                var tmp = sel.selectAll("*").select("desc").each(function () {
                        if(isJsonString(this.textContent))
                        {    
                            var object = JSON.parse(this.textContent);
                            //console.log(object)
                            object.node = this;
                            d3.select(object.node.parentNode).on("click", function($event) {
                                itemClicked(object,$event);
                            });

                            $http.post("/getStatus", object)
                            .success(function (data) {
                                d3.select(object.node.parentNode).style('fill',data.color);
                            });  
                        };
                    });
                setTimeout(changeColor, 1000);
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