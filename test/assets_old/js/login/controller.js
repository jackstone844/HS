(function() {
    //'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

        loginController.$inject = ['$scope', 'Auth', '$state', '$http', '$httpParamSerializer'];

        function loginController ($scope, Auth, $state, $http, $httpParamSerializer) {

            $scope.user = {
                email: '',
                password: '',
            };

            $scope.login = function(){
                Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password)
                .then(function(auth){
                    console.log('User logged in to Firebase');
                    
                    // lets get a ref to the signed in user's uid and pass it to getJWT
                    var uid = Auth.$getAuth().uid;
                    getJWT(uid);
                    
                }, function(err) {
                    console.log(err.message);
                    $scope.err = err;
                });

            // TODO: Put this in a service / factory 
            var getJWT = function(uid) {
        
                return $http({
                    url: '/api/authenticate',
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: $httpParamSerializer,
                    data: {
                        "uid": uid
                      }
                })
                .then(function(res){
                    if (res.data.authenticated == true) {   
                        // If successful, log jwt and bind it to the scope
                        console.log(res.data.token);
                        var validJWT = res.data.token;
                        // push validJWT to local storage 
                        localStorage.setItem('HSToken', validJWT);
                        // push user to their profile view
                        $state.go('admin.home');
                    } else {
                        // sign user out as not authenticated on server
                        Auth.$signOut()
                        .then(function(){
                            console.log('no token recieved');
                        });
                    }
                }, function(err){
                    console.log(err);
                });
            };
  
        };
    }
})();