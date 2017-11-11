(function() {
    'use strict';

    angular
        .module('app')
        .controller('venueController', venueController);

        venueController.$injext = ['$scope', 'Auth', '$state', '$http', '$httpParamSerializer'];

        function venueController ($scope, Auth, $state, $http, $httpParamSerializer) {
            
            $scope.userDetails = {
                uid : Auth.$getAuth().uid,
                FBtoken : Auth.$getAuth().refreshToken,
                HStoken : localStorage.HSToken
            };

            $scope.newVenue = {
                venueId : '',
                venueName : '',
                description : '',
                addressLine1 : '',
                addressLine2 : '',
                postCode : '',
                rating : '',
                price : '',
                features : '',
                category : '',
                starCount : ''
                // fb
                // insta
                // website
                // contact number
                // picture 1 url
                // picture 2 url
            };

            $scope.addNewVenue = function() {

                return $http({
                    url: '/api/add/venue',
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: $httpParamSerializer,
                    data: {
                        "venueId": $scope.newVenue.venueId,
                        "venueName" : $scope.newVenue.venueName,
                        "description" : $scope.newVenue.description, 
                        "addressLine1" : $scope.newVenue.addressLine1,
                        "addressLine2": $scope.newVenue.addressLine2,
                        "postCode" : $scope.newVenue.postCode,
                        "rating" : $scope.newVenue.rating, 
                        "price" : $scope.newVenue.price,
                        "features" : $scope.newVenue.features,
                        "category" : $scope.newVenue.category, 
                        "starCount" : $scope.newVenue.starCount,
                        "adminUid" : $scope.userDetails.uid,
                        "token" : $scope.userDetails.HStoken
                    }
                })
                .then(function(res){
                    // log the response & assign it to newAdminUserRes $scope
                    console.log(res);
                    $scope.addNewVenueResult = res;
                }, function(err){
                    // log the error & assign it to newAdminUserRes $scope
                    console.log(err);
                    $scope.addNewVenueResult = err;
                });
            };

      
        }
})();