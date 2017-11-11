(function() {
    'use strict';

    angular
        .module('app')
        .directive('date', date);

        date.$inject = ['$timeout', 'dateFilter'];

        function date ($timeout, dateFilter) {

            return {

                restrict: 'E',

                link: function(scope, iElement) {

                	(function updateDate() {
                    	iElement.text(dateFilter(new Date(), 'M/d/yy'));
                    	$timeout(updateDate, 60 * 60 * 1000);
                  	})();

                }

            };

        }

})();

       