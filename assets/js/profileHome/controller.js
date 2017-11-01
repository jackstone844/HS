(function() {
    //'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

        homeController.$inject = ['$scope', 'Auth', '$state', '$http', '$httpParamSerializer', '$interval', '$location'];

        function homeController ($scope, Auth, $state, $http, $httpParamSerializer, $interval, $location) {

            $scope.userDetails = {
                uid : Auth.$getAuth().uid,
                FBtoken : Auth.$getAuth().refreshToken,
                HStoken : localStorage.HSToken,
                venueCount : '',
                venuesAdded : [],
            };

            $scope.newAdmin = {
                uid : '',
                displayName : '',
                email : '',
                password : ''
            };

            $scope.error = {
                message : ''
            };
 
            // Adds a new admin to Hackney Social
            $scope.addNewAdmin = function() {
                
                return $http({
                    url: '/api/add/admin',
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: $httpParamSerializer,
                    data: {
                        "uid": $scope.newAdmin.uid,
                        "displayName" : $scope.newAdmin.displayName,
                        "email" : $scope.newAdmin.email, 
                        "password" : $scope.newAdmin.password,
                        "token" : $scope.userDetails.HStoken
                    }
                })
                .then(function(res){
                    // log the response & assign it to newAdminUserRes $scope
                    console.log(res);
                    $scope.addNewAdminResult = res;
                }, function(err){
                    // log the error & assign it to newAdminUserRes $scope
                    console.log(err);
                    $scope.addNewAdminResult = err;
                });
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