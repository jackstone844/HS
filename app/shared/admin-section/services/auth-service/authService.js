angular
.module('app')
.factory('Auth', Auth);

Auth.$inject = ['$http', '$firebaseAuth'];

function Auth($http, $firebaseAuth) {
    var auth = $firebaseAuth();
    
    return auth;

}
    