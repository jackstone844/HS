(function() {
    //'use strict';

    angular
        .module('app')
        .controller('adminProfileController', adminProfileController);

        adminProfileController.$inject = ['$scope', 'Auth', '$state', '$http', '$httpParamSerializer', '$interval', '$location'];

        function adminProfileController ($scope, Auth, $state, $http, $httpParamSerializer, $interval, $location) {

            $scope.userDetails = {
                uid : Auth.$getAuth().uid,
                FBtoken : Auth.$getAuth().refreshToken,
                HStoken : localStorage.HSToken,
                venueCount : '',
                venuesAdded : [],
            };

            $scope.error = {
                message : ''
            };

            (function getAdminCount() {

                return $http({
                    url: '/api/current-admin/venue-count',
                    method: 'GET',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: $httpParamSerializer,
                    params: {
                        "uid": $scope.userDetails.uid,
                        "token" : $scope.userDetails.HStoken
                    }
                })
                .then(function(res){
                    // log the response & assign it to userVenueCount $scope
                    console.log(res);
                    $scope.userDetails.venueCount = res;
                }, function(err){
                    // log the error & assign it to newAdminUserRes $scope
                    console.log(err);
                    $scope.error.message = err;
                });
            })();

        }
        
})();