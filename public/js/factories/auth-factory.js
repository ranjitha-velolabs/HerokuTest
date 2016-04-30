'use strict';
angular.module('skyfleet').factory('authFactory', [
    '$http',
    function($http) {
        return {
            login: function(payload, callback) {
                console.log(callback);
                var payload = payload;
                console.log(payload);

                $http.post('/api/user/login', JSON.stringify(payload))
                    .success(function (response) {
                        callback(null, response.payload);
                    }).error(function (error) {
                    callback(error, null);
                });
            },
            logout: function(callback) {
                var payload = {user :false};
                $http.get('/api/user/logout')
                    .success(function (response) {
                        console.log(response);
                        callback(null,response.payload);
                    }).error(function (error) {
                    console.log(error);
                    callback(error, null);
                });
            },
            register: function(payload,callback) {
                var payload = payload;
                $http.post('/api/user/register',JSON.stringify(payload))
                    .success(function (response) {
                        callback(null, response.payload);
                    }).error(function (error) {
                    callback(error, null);
                });
            }
        }

    }

]);
