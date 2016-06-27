angular
    .module('app')
    .controller('MenuCtrl', function ($scope,lines) {

        function getLineSections(){
            $scope.sections = lines.selectedLine.sections;
            lines.updateSections();
            setTimeout(getLineSections,100)
        }
        getLineSections();

    })