angular
    .module('app')
    .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];

    function dataservice($http) {
        return {
            getData : getData
        };

        function getData(a, b, c) {
            return $http({
                url: '/api',
                method: 'GET',
                params: {
                    uniqueId : a,
                    pageId : b,
                    sessionId : c
                }
            })
            .then(getDataComplete);

            function getDataComplete(response) {
                return response.data;
            }
        }

    }