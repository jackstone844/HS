angular
.module('app')
.factory('StorageBucket', StorageBucket);


StorageBucket.$inject = ['$http', 'firebase'];

function StorageBucket($http, firebase) {
    var storage = firebase.storage();
    
    return storage;

}
    