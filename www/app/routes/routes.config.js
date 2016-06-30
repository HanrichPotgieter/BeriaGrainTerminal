angular
    .module('myroutes', ['ui.router'])
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
            .state('OTL1',{
                url:'/OTL1',
                views:{
                    '@': {
                    templateUrl: 'lines/OTL1.view.html'
                    }
                }
            })
            .state('OTL2',{
                url:'/OTL2',
                views:{
                    '@': {
                    templateUrl: 'lines/OTL2.view.html'
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
                    templateUrl: 'view/SETTINGS.view.html'
                    }
                }
            })
    }]);
    
