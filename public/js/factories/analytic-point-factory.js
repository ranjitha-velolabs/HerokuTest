'use strict';
angular.module('skyfleet').factory('analyticPointFactory', [
        '$http',
        function($http) {
            return {
                getPointsInView: function(coordinates, callback) {
                    var payload = {coordinates: coordinates};

                    $http.post('/api/analytics-points', JSON.stringify(payload))
                        .success(function (response) {
                            callback(null, response.payload);
                        }).error(function (error) {
                            callback(error, null);
                        });
                }
            };
        }
    ]
);
