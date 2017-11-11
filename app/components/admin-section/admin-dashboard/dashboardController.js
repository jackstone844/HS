(function() {
    'use strict';

    angular
        .module('app')
        .controller('adminDashboardController', adminDashboardController);

        adminDashboardController.$injext = ['$scope', 'Auth', '$state'];

        function adminDashboardController ($scope, Auth, $state) {
            
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