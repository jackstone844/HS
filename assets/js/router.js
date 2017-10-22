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
                .state('login', {
                    url: '/admin/login',
                    controller: 'loginController',
                    templateUrl: 'login/template.html',
                    resolve: {
                        requireNoAuth: function($state, Auth) {
                            return Auth.$requireSignIn().then(function(auth){
                                $state.go('admin.home');
                            }, function(error){
                                return;
                            });
                        }
                    }
                })
                .state('admin', {
                    url: '/admin/profile',
                    controller: 'profileController',
                    templateUrl: 'profile/template.html',
                    resolve: {
                        requireAuth: function($state, Auth) {
                            return Auth.$requireSignIn().then(function(auth){
                                return;
                            }, function(error){
                                if (localStorage.getItem('HSToken')) {
                                    localStorage.removeItem('HSToken');
                                    setTimeout(function() {
                                        $state.go('login');
                                    }, 500);
                                } else {
                                    $state.go('login');
                                }     
                            });
                        }
                        // IF NO HSToken -> push to login
                    }
                })
                .state('admin.venue', {
                    url: '/venue',
                    controller: 'venueController',
                    templateUrl: 'profileVenue/template.html',
                    resolve: {
                        requireAuth: function($state, Auth) {
                            return Auth.$requireSignIn().then(function(auth){
                                return;
                            }, function(error){
                                if (localStorage.getItem('HSToken')) {
                                    localStorage.removeItem('HSToken');
                                    setTimeout(function() {
                                        $state.go('login');
                                    }, 500);
                                } else {
                                    $state.go('login');
                                }     
                            });
                        }
                        // IF NO HSToken -> push to login
                    }
                })
                .state('admin.home', {
                    url: '/home',
                    controller: 'homeController',
                    templateUrl: 'profileHome/template.html',
                    resolve: {
                        requireAuth: function($state, Auth) {
                            return Auth.$requireSignIn().then(function(auth){
                                return;
                            }, function(error){
                                if (localStorage.getItem('HSToken')) {
                                    localStorage.removeItem('HSToken');
                                    setTimeout(function() {
                                        $state.go('login');
                                    }, 500);
                                } else {
                                    $state.go('login');
                                }     
                            });
                        }
                        // IF NO HSToken -> push to login
                    }
                })
                .state('admin.dashboard', {
                    url: '/dashboard',
                    controller: 'dashboardController',
                    templateUrl: 'profileDashboard/template.html',
                    resolve: {
                        requireAuth: function($state, Auth) {
                            return Auth.$requireSignIn().then(function(auth){
                                return;
                            }, function(error){
                                if (localStorage.getItem('HSToken')) {
                                    localStorage.removeItem('HSToken');
                                    setTimeout(function() {
                                        $state.go('login');
                                    }, 500);
                                } else {
                                    $state.go('login');
                                }     
                            });
                        }
                        // IF NO HSToken -> push to login
                    }
                });
        });
})();