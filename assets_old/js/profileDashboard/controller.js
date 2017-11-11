(function() {
    'use strict';

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

        dashboardController.$injext = ['$scope', 'Auth', '$state'];

        function dashboardController ($scope, Auth, $state) {
            
            $scope.userDetails = {
                uid : Auth.$getAuth().uid,
                token : Auth.$getAuth().refreshToken
            };

            /*$scope.logout = function() {
                Auth.$signOut()
                .then(function(){
                    localStorage.removeItem('HSToken');
                    setTimeout(function() {
                        $state.go('login');
                    }, 500);
                });
            };*/

        }
})();