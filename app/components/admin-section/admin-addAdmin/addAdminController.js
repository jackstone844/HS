(function() {
    'use strict';

    angular
        .module('app')
        .controller('adminAddadminController', adminAddadminController);

        adminAddadminController.$injext = ['$scope', 'Auth', '$state', '$http', '$httpParamSerializer'];

        function adminAddadminController ($scope, Auth, $state, $http, $httpParamSerializer) {
            
            $scope.userDetails = {
                uid : Auth.$getAuth().uid,
                FBtoken : Auth.$getAuth().refreshToken,
                HStoken : localStorage.HSToken
            };

            $scope.newAdmin = {
                uid : '',
                displayName : '',
                email : '',
                password : ''
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

      
        }
})();