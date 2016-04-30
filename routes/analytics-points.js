'use strict';

var express = require('express');
var router = express.Router();
const _ = require('underscore');
const jsonResponse = require('./../utils/json-response');
const analyticsPointsHandler = require('./../utils/analytics-point-handler');

router.post('/', function(req, res, next) {
    if (!_.has(req.body, 'coordinates')) {
        console.log('No coordinate object passed to server');
        // FIXME figure out what response codes to use
        jsonResponse(res, 500, new Error('No coordinate object passed to server'), null);
        return;
    }

    analyticsPointsHandler(req.body.coordinates, function (error, points) {
        error ? console.log('Error getting points:', error) :
            console.log('sending', points.length, 'points to client');

        jsonResponse(res, 200, error, points);
    });
});

module.exports = router;
