(function() {
    'use strict';

    angular
        .module('app')
        .directive('clock', clock);

        clock.$inject = ['$timeout', 'dateFilter'];

        function clock ($timeout, dateFilter) {

            return {

                restrict: 'E',

                link: function(scope, iElement) {

                	(function updateClock() {
                    	iElement.text(dateFilter(new Date(), 'H:mm:ss'));
                    	$timeout(updateClock, 1000);
                  	})();

                }

            };

        }

})();

       