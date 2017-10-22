(function() {
    'use strict';

    angular
        .module('app')
        .controller('venueController', venueController);

        venueController.$injext = ['$scope', 'Auth', '$state'];

        function venueController ($scope, Auth, $state) {
            
            $scope.userDetails = {
                uid : Auth.$getAuth().uid,
                token : Auth.$getAuth().refreshToken
            };

            $scope.newVenue = {
                venueId : $scope.newVenueId,
                venueName : $scope.newVenueName,
                description : $scope.newVenueDescription,
                addressLine1 : $scope.newVenueAdLineOne,
                addressLine2 : $scope.newVenueAdLineTwo,
                postCode : $scope.newVenuePostcode,
                rating : $scope.newVenueRating,
                price : $scope.newVenuePrice,
                features : $scope.newVenueFeaters,
                category : $scope.newVenueCategory,
                starCount : $scope.newVenueStars,
                adminUid : $scope.userDetails.uid
            };
        }
})();