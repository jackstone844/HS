(function() {
    'use strict';

    angular
        .module('app')
        .controller('adminIndexController', adminIndexController);

        adminIndexController.$injext = ['$scope', 'Auth', '$state', 'StorageBucket'];

        function adminIndexController ($scope, Auth, $state, StorageBucket) { 

            $scope.userDetails = {
                uid : Auth.$getAuth().uid,
                FBtoken : Auth.$getAuth().refreshToken,
                HStoken : localStorage.HSToken
            };

            $scope.logout = function() {
                Auth.$signOut()
                .then(function(){
                    localStorage.removeItem('HSToken');
                    setTimeout(function() {
                        $state.go('login');
                    }, 500);
                });
            };

            $scope.collapse = function(){
                angular.element('.navbar-collapse').collapse('hide');
            };

            angular.element(document).ready(function () {
                angular.element('a').click(function(){
                    angular.element('a').removeClass("active");
                    angular.element(this).addClass("active");
                });
            });
            
            (function() {
                StorageBucket.ref('logo.png').getDownloadURL().then(function(url) {
                    var logo = url;
                    var img = document.getElementById('logo');
                    img.src = logo;
                });
            })();
        }

})();