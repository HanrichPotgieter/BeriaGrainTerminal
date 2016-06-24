angular
    .module('app', ['ngMaterial','ngMdIcons','ui.router'])
    .controller('app', function ($scope, $timeout, $mdSidenav, $log) {
    }).controller('MenuCtrl', function ($scope) {

    })
    .controller('WindowCtrl', function ($scope) {
      $scope.topDirections = ['left', 'up'];
      $scope.bottomDirections = ['down', 'right'];
      $scope.isOpen = false;
      $scope.availableModes = ['md-fling', 'md-scale'];
      $scope.selectedMode = 'md-fling';
      $scope.availableDirections = ['up', 'down', 'left', 'right'];
      $scope.selectedDirection = 'left';
    })
    .controller('SettingsCtrl', function ($scope) {
        $scope.plc = {
            ip:'10.0.0.2'
        }
    })
    .controller('LineCtrl', function ($scope,$http) {
        function changeColor() {
            var sel = d3.select(document.getElementById("image").contentDocument).selectAll("*");
            if(sel.empty()) {
                console.log('hello');
                setTimeout(changeColor, 100);
            } else {
                
                var tmp = sel.selectAll("*").select("desc").each(function () {
                        if(isJsonString(this.textContent))
                        {    
                            var object = JSON.parse(this.textContent);
                            console.log(object)
                            object.node = this;
                            $http.post("/getStatus", object)
                            .success(function (data) {
                                console.log(data);
                                d3.select(object.node.parentNode).style('fill',data.color);
                                
                            });  
                            //d3.select(this.parentNode).style('fill','green');
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
    