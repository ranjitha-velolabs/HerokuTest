/**
 * Created by Karthick Krishnan on 19-04-2016.
 */
'use strict';
angular.module('skyfleet').factory('tripExplorerService', [
        '$http',
        function($http) {
            return {
                getTripHistory: function(payload,callback) {
                    console.log(callback);
                    var payload = payload;
                    console.log(payload);

                    $http.get('/api/rides/riderinfo/', JSON.stringify(payload))
                        .success(function (response) {
                            callback(null, response.payload);
                        }).error(function (error) {
                        callback(error, null);
                    });
                },

            }

        }
    ]);
