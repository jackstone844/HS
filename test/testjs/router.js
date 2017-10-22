(function(){
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider){

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('welcome', {
                    url: '/',
                    templateUrl: 'index/template.html',
                    controller: 'indexController'
                })
                .state('analytics', {
                    url: '/analytics',
                    templateUrl: 'analyticsGrab/template.html',
                    controller: 'analyticsController'
                })
                .state('analytics.page', {
                    url: '/page',
                    templateUrl: 'analyticsGrabPage/template.html',
                    controller: 'analyticsPageController'
                })
                .state('admin', {
                    url: '/admin/login',
                    templateUrl: 'login/template.html',
                    controller: 'loginController'
                });
        });
})();