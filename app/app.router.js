(function(){
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider){

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('blog', {
                    url: '/',
                    templateUrl: 'components/blog-section/blog-index/indexView.html',
                    controller: 'blogIndexController'
                })
                .state('login', {
                    url: '/admin/login',
                    controller: 'adminLoginController',
                    templateUrl: 'components/admin-section/admin-login/loginView.html',
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
                    url: '/admin/home',
                    controller: 'adminIndexController',
                    templateUrl: 'components/admin-section/admin-index/indexView.html',
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
                .state('admin.addvenue', {
                    url: '/addvenue',
                    controller: 'adminAddvenueController',
                    templateUrl: 'components/admin-section/admin-addVenue/addVenueView.html',
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
                .state('admin.profile', {
                    url: '/profile',
                    controller: 'adminProfileController',
                    templateUrl: 'components/admin-section/admin-profile/profileView.html',
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
                    controller: 'adminDashboardController',
                    templateUrl: 'components/admin-section/admin-dashboard/dashboardView.html',
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
                .state('admin.addadmin', {
                    url: '/addadmin',
                    controller: 'adminAddadminController',
                    templateUrl: 'components/admin-section/admin-addAdmin/addAdminView.html',
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

/**
 * Need to Add a state for addAdmin
 */