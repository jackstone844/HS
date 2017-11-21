(function() {
    'use strict';

    angular
        .module('app')
        .controller('adminAddvenueController', adminAddvenueController);

        adminAddvenueController.$injext = ['$scope', 'Auth', '$state', '$http', '$httpParamSerializer', 'StorageBucket', '$q'];

        function adminAddvenueController ($scope, Auth, $state, $http, $httpParamSerializer, StorageBucket, $q) {
            
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
                postCode : '',
                rating : '',
                price : '',
                features : [], 
                category : '',
                subCategory : '',
                facebook : '',
                instagram : '',
                website : '',
                contactNumber : '',
                closestStation : '',
                pictureUrl : '',
                // picture 2 url
            };

            $scope.file = '';

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
                        "postCode" : $scope.newVenue.postCode,
                        "rating" : $scope.newVenue.rating, 
                        "price" : $scope.newVenue.price,
                        "features" : $httpParamSerializer($scope.newVenue.features), // features:0=Arcade+Games&1=Tapas&2=Greenery split on server
                        "category" : $scope.newVenue.category,
                        "subCategory" : $scope.newVenue.subCategory,
                        "facebook" : $scope.newVenue.facebook,
                        "instagram" : $scope.newVenue.instagram,
                        "website" : $scope.newVenue.website,
                        "contactNumber" : $scope.newVenue.contactNumber,
                        "closestStation" : $scope.newVenue.closestStation,
                        "pictureUrl" : $scope.newVenue.pictureUrl,
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

            $scope.assignSelectedDropdown = function(selected, key) {
                $scope.newVenue[key] = selected;
            };

            $scope.assignSelectedRadios = function(selected, key) {
                if ($scope.newVenue[key].includes(selected)){
                    var ref = $scope.newVenue[key].indexOf(selected);
                    $scope.newVenue[key].splice(ref, 1);
                } else {
                    $scope.newVenue[key].push(selected);
                }
            };
            
            $scope.handleFiles = function(element) {

                let updatedFiles = element.files;
                let updatedFile = element.files[0];
                if (updatedFiles.length > 0) {
                    $scope.file = updatedFile;
                    console.log($scope.file);
                } else {
                    $scope.file = '';
                }
            };

            // assign the file name to scope var and pass that name into the uploadchecker function

            $scope.uploadChecker = function(file) {
                if ($scope.file){
                    upload($scope.file, 'testFile');
                } else {
                    alert('You have not selected an image to upload!');
                }
            }; 

            function upload(file, fileName) {
                var storageRef = StorageBucket.ref();
                var deferred = $q.defer();
                var fileRef = storageRef.child(fileName);
                var uploadTask = fileRef.put(file);
                
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                   function(snapshot) {
                      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                      switch (snapshot.state) {
                         case firebase.storage.TaskState.PAUSED:
                           console.log('Upload is paused');
                           break;
                         case firebase.storage.TaskState.RUNNING:
                           console.log('Upload is running');
                           break;
                      }
                  },
                  function(error) {
                     switch (error.code) {
                        case 'storage/unauthorized':
                            deferred.reject('User does not have permission to access the object.');
                            break;
                        case 'storage/canceled':
                            deferred.reject('User canceled the upload.');
                            break;
                        case 'storage/unknown':
                            deferred.reject(' Unknown error occurred, Please try later.');
                            break;
                      }
                   }, function() {
                         deferred.resolve(uploadTask.snapshot.downloadURL);
                         var downloadURL = uploadTask.snapshot.downloadURL;
                         $scope.newVenue.pictureUrl = uploadTask.snapshot.downloadURL;
                         console.log($scope.newVenue.pictureUrl);
                   });
                return deferred.promise;
             }



      
        } 
})();