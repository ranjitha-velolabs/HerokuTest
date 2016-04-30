'use strict';
angular.module('skyfleet.controllers')
    .controller('analyticsTabController', ['$scope', '$http', '$state', '$localStorage', '$rootScope', 'sessionFactory', '$location', function($scope, $http, $state, $localStorage, $rootScope, sessionFactory, $location) {
        $state.go('analytics.tripExplorer');
        $rootScope.click = function() {
            $state.reload();
        }
    }]);
