'use strict'
angular.module('skyfleet.controllers').factory('tripexplorerFactory', ['$q', '$timeout', '$http', '$rootScope',

    function($q, $timeout, $http, $rootScope) {

        var user = null;
        var name = "";
        return ({
            rideinfo:rideinfo
        });



        function rideinfo(callback) {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.get('/api/rides/riderinfo/')
                // handle success
                .success(function(msg,status,data) {
                    console.log(data);
                    callback(msg.payload,true);

                })
                // handle error
                .error(function(data) {
                    user = false;
                    callback(msg.payload,false);
                });

            // return promise object
            return deferred.promise;

        }

    }
])
