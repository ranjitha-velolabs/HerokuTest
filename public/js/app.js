/**
 * Created by Karthick Krishnan on 03-02-2016.
 */
'use strict';

angular.module('underscore', []).factory('_', [
    '$window',
    function($window) {
        return $window._;
    }
]);

angular.module('mapbox', []).factory('L', [
    '$window',
    function($window) {
        return $window.L;
    }
]);

angular.module('skyfleet', ['ui.router','skyfleet.controllers','ngStorage','ui.bootstrap','ngAnimate','ngMaterial','md.data.table','angAccordion','ui-rangeSlider','leaflet-directive', 'mapbox', 'underscore','ngRoute','ngCookies'])

    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue', {
                'default': '300'
            })
            .accentPalette('deep-orange', {
                'default': '500'
            });
    })

    .config(
        [
            '$stateProvider',
            '$urlRouterProvider','$logProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/Dashboard');
                $stateProvider
                    .state('list', {
                        url: '/list',
                        templateUrl: '../html/app-opening-areas.html',
                        controller: 'appOpeningAreasController'
                    })
                    .state('dashboard', {
                        url: '/Dashboard',
                        templateUrl: '../html/dashboard.html',
                        controller: 'dashboardController'
                    })
                    .state('analytics', {
                        url: '/Analytics',
                        templateUrl: '../html/analytics.html',
                        controller: 'analyticsTabController'
                    })
                    .state('analytics.tripExplorer', {
                        url: '/TripExplorer',
                        templateUrl: '../html/trip-explorer.html',
                        controller: 'tripExplorerController'
                    })
                    .state('analytics.trendsAndPatterns', {
                        url: '/TrendsAndPatterns',
                        templateUrl: '../html/trends-and-patterns.html',
                        controller: 'trendsAndPatternsController'
                    })

                    .state('analytics.geofenceZones', {
                        url: '/geofenceZones',
                        templateUrl: '../html/geofence.html'
                    })

                    .state('analytics.trendsAndPatterns.appAreas', {
                        url: '/appAreas',
                        templateUrl: '../html/app-opening-areas.html',
                        controller: 'listController'
                    })
                    .state('analytics.trendsAndPatterns.rentalSupply', {
                        url: '/rentalSupply',
                        templateUrl: '../html/rental-supply.html',
                        controller: 'rentalSupplyController'
                    })
                    .state('analytics.trendsAndPatterns.rentalDemand', {
                        url: '/rentalDemand',
                        templateUrl: '../html/rental-demand.html',
                    })
                    .state('analytics.trendsAndPatterns.unmetDemand', {
                        url: '/unmetDemand',
                        templateUrl: '../html/unmet-demand.html',
                    })
                    .state('analytics.trendsAndPatterns.bikeInVersusOut', {
                        url: '/unmetDemand',
                        templateUrl: '../html/bike-in-versus-out.html',
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: '../html/login.html',
                        controller: 'loginController',
                        access: {
                            restricted: false
                        }
                    })
                    .state('register', {
                        url: '/register',
                        templateUrl: '../html/register.html',
                        controller: 'registerController',
                        access: {
                            restricted: true
                        }
                    })

            }
        ]).run(
    ['$rootScope', '$state', '$route', 'sessionFactory',
        function($rootScope, $state, $route, sessionFactory) {
            //Initial Route Checking
            if (!sessionFactory.getCookieData()) {
                event.preventDefault();
                $state.transitionTo('login');
            } else{
                event.preventDefault();
                $state.transitionTo('dashboard');
            }

        }
    ]);
angular.module('skyfleet.controllers',[])
