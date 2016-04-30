'use strict'
angular.module('skyfleet.controllers').factory("sessionFactory", [
    "$cookies",
    function($cookies) {
        var userName = "";

        return {
            setCookieData: function(json) {
                userName = json;
                $cookies.put("userName", json['name']);
            },
            getCookieData: function() {
                userName = $cookies.get("userName");
                return userName;
            },
            clearCookieData: function() {
                userName = "";
                $cookies.remove("userName");
            }
        }
    }
]);
