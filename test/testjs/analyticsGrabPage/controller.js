(function() {
    'use strict';

    angular
        .module('app')
        .controller('analyticsPageController', analyticsPageController);

        analyticsPageController.$injext = [$scope, dataservice];

        function analyticsPageController ($scope, dataservice) {
            
            $scope.uniqueID = "";
            $scope.screenID = "";
            $scope.sessionID = "";
            $scope.go = "";

            function go() {
                return dataservice.getData($scope.uniqueID, $scope.screenID, $scope.sessionID)
                .then(function(response) {
                    $scope.return = response;
                });
            }
            
        }
})();