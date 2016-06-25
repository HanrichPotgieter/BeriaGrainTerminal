angular
    .module('app', ['ngMaterial','ngMdIcons','ui.router'])
    .controller('app', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleLeft = buildDelayedToggler('left');
        function buildDelayedToggler(navID) {
        return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
            .toggle()
            .then(function () {
                $log.debug("toggle " + navID + " is done");
            });
        }, 200);
        }
        function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
            }, wait || 10);
        };
        }
    }).controller('MenuCtrl', function ($scope) {

    })
    .controller('WindowCtrl', function ($scope,$http) {
      $scope.topDirections = ['left', 'up'];
      $scope.bottomDirections = ['down', 'right'];
      $scope.isOpen = false;
      $scope.availableModes = ['md-fling', 'md-scale'];
      $scope.selectedMode = 'md-fling';
      $scope.availableDirections = ['up', 'down', 'left', 'right'];
      $scope.selectedDirection = 'left';

      $scope.start = function(){
        var object = {
            DB:'600',
            OFFSET:'241',
            BIT:'1'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            console.log('done');
        }); 
      }

      $scope.stop = function(){
        var object = {
            DB:'600',
            OFFSET:'69',
            BIT:'7'
        };
        $http.post("/setBit", object)
        .success(function (data) {
            console.log('done');
        }); 
      }

    })

    .controller('SettingsCtrl', function ($scope) {
        $scope.plc = {
            ip:'10.0.0.2'
        }
    })

    .controller('LineCtrl', function ($scope,$http,$mdDialog,$mdMedia) {
        function DialogController($scope,$http, item) {
            $scope.item = item;
            $scope.item.style = {
                "background-color" : "white",
            }
            $scope.ios = item.ios;
            function getStatus(){
                $http.post("/getStatus", item)
                .success(function (data) {
                    console.log(data);
                    $scope.item.style['background-color'] = data.color;
                    $scope.item.status = data.status;
                });  
                setTimeout(getStatus, 200);               
            }  

            getStatus();

        }

        $scope.showAdvanced = function(object) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
            controller: DialogController,
            templateUrl: './view/elementDialog.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
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

    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise("/");
            $stateProvider
            .state('home', {
                url: '/',
                views: {
                    '@': {
                    templateUrl: 'home.view.html'
                    }
                }
            })
            .state('INT1',{
                url:'/INT1',
                views:{
                    '@': {
                    templateUrl: 'lines/int1.view.html'
                    }
                }
            })
            .state('PTR1',{
                url:'/PTR1',
                views:{
                    '@': {
                    templateUrl: 'lines/ptr1.view.html'
                    }
                }
            })
            .state('PTR2',{
                url:'/PTR2',
                views:{
                    '@': {
                    templateUrl: 'lines/PTR2.view.html'
                    }
                }
            })
            .state('WTR1',{
                url:'/WTR1',
                views:{
                    '@': {
                    templateUrl: 'lines/WTR1.view.html'
                    }
                }
            })
            .state('SETTINGS',{
                url:'/SETTINGS',
                views:{
                    '@': {
                    templateUrl: 'lines/SETTINGS.view.html'
                    }
                }
            })
    }]);
    