(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

        homeController.$injext = ['$scope', 'Auth', '$state', '$http', '$httpParamSerialize'];

        function homeController ($scope, Auth, $state, $http, $httpParamSerialize) {
            
            $scope.userDetails = {
                uid : Auth.$getAuth().uid,
                FBtoken : Auth.$getAuth().refreshToken,
                HStoken : localStorage.token
            };

            $scope.newAdminDetails = {
                uid : $scope.newAdminUid,
                displayName : $scope.newAdminDisplayName,
                email : $scope.newAdminEmail,
                password : $scope.newAdminPassword

            };

            // TODO: Put this in a service / factory 
            $scope.addNewAdmin = function(uid, displayName, email, password) {
                
                return $http({
                    url: '/api/add/admin',
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: $httpParamSerializer,
                    data: {
                        "uid": $scope.newAdminDetails.uid,
                        "displayName" : $scope.newAdminDetails.displayName,
                        "email" : $scope.newAdminDetails.email, 
                        "password" : $scope.newAdminDetails.password,
                        "token" : $scope.userDetails.HStoken
                    }
                })
                .then(function(res){
                    // log the response & assign it to newAdminUserRes $scope
                    console.log(res);
                    $scope.addNewAdminRes = res;
                }, function(err){
                    // log the error & assign it to newAdminUserRes $scope
                    console.log(err);
                    $scope.addNewAdminRes = res;
                });
            };

        }
})();