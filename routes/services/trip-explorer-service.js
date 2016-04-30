'use strict';

var express = require('express');
var router = express.Router();
var rideMaster = require('./../models/ride-master');
var tripExplorerDao = require('./../dao/trip-explorer-dao.js');
var jsonResponse = require('./../../utils/json-response');
var momentApi = require('./../../utils/moment-api');

//Get data for trip explorer page
router.get('/rider-info/', function(req, res, next) {
    var output = {};
    tripExplorerDao.getTripHistory(rideMaster, output, function(err, json) {
        if (json && !err) {
            if (json.rideMaster) {
                for (var i = 0; i < json.rideMaster.length; i++) {
                    var startTime = momentApi.getTime(json.rideMaster[i].start_date);
                    var endTime = momentApi.getTime(json.rideMaster[i].end_date);
                    var timeDiff = endTime - startTime;
                    var timeDiffInMinutes = momentApi.getDifferenceinMinutes(timeDiff);
                    var timeDiffInHours = momentApi.getDifferenceinHours(timeDiff);
                    var duration = {};
                    duration.hours = parseInt(timeDiffInHours) + "Hours";
                    duration.minutes = timeDiffInMinutes + "min";
                    json.rideMaster[i].start_time = momentApi.getTimeFormat(startTime);
                    json.rideMaster[i].end_time = momentApi.getTimeFormat(endTime);
                    json.rideMaster[i].duration = duration;
                }
            }
            jsonResponse(res, 200, err, json);
        } else {
            jsonResponse(res, 400, err, null);
        }
    })
});

//Update data for trip explorer with filter inputs
router.post('/trip-info/', function(req, res, next) {
    var output = {};
    var filterByDuration = {};
    if (req.body.time) {
        filterByDuration.time = req.body.time;
    }
    var filterByLength = {};
    if (req.body.miles) {
        filterByLength.miles = req.body.miles;
    }
    var filterByPickup = {};
    if (req.body.pickUp) {
        filterByPickup.startLocation = req.body.pickUp;
    }
    var filterByDropoff = {};
    if (req.body.dropOff) {
        filterByDropoff.endLocation = req.body.dropOff;
    }
    var filterByBikes = {};
    if (req.body.customer) {
        filterByBikes.customer = req.body.customer;
    }
    tripExplorerDao.getTripInfo(rideMaster, filterByDuration, filterByLength, filterByPickup, filterByDropoff, filterByBikes, output, function(err, json) {
        if (json && !err) {
            jsonResponse(res, 200, err, json);
        } else {
            jsonResponse(res, 400, err, null);
        }
    });
});

module.exports = router;
