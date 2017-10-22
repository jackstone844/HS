(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

        loginController.$injext = [$scope, dataservice];

        function loginController ($scope, dataservice) {
            
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