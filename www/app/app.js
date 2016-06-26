angular
    .module('app', ['ngMaterial','ngMdIcons','ui.router','myroutes'])
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
    });
    