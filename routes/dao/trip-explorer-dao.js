'use strict';

var momentApi = require('./../../utils/moment-api');

// Delay the execution of findOrCreateUser and execute
// the method in the next tick of the event loop
/*
 * Trip History Data from "rideMaster" table in database
 *
 * @param {Object} Express rideMaster table schema
 * @param {Object} Response object
 * @param {Object} callback for result object
 */
var getTripHistory = function(rideMaster, output, callback) {
    rideMaster.find({}).populate("bike_id").populate("user_id").lean().exec(function(err, result) {
        output.rideMaster = result;
        return callback(null, output);
    });

}
/*
 * Trip Filters for TripExplorer from "rideMaster" table in database
 *
 * @param {Object} Express rideMaster table schema
 * @param {Object} Response object
 * @param {Object} callback for result object
 */
var getTripHistoryLatLngs = function(rideMaster,output) {
    rideMaster.find({}).populate("bike_id").lean().exec(function(err, result) {
        output.TripLatLngs = result;
        for (var i = 0; i < result.length; i++) {
            for(var j = 0;j<result[i].bike_id.current_latlngs.length;j++) {
               for(var k = 0;k<result[i].bike_id.current_latlngs[j].length;k++){
                   output.TripLatLngs[i].point = result[i].bike_id.current_latlngs[j];
               }
            }
        }
    });
}
/*
 * Filter operation for trip explorer page
 *
 * @param {Object} Express rideMaster table schema
 * @param {Object} Duration from request object
 * @param {Object} Length from request object
 * @param {Object} Pickup Location from request object
 * @param {Object} Dropoff Location from request object
 * @param {Object} Purticular bike_id from request object
 * @param {Object} Express response object
 * @param {Object} callback for result
 */
var getTripInfo = function(rideMaster, filterByDuration, filterByLength, filterByPickup, filterByDropoff, filterByBikes, output, callback) {

    if(filterByDuration || filterByLength || filterByPickup || filterByDropoff || filterByBikes) {
        getTripHistoryLatLngs(rideMaster,output);
    }
    if (filterByDuration && filterByDuration.time) {
        rideMaster.find({}).populate("bike_id").populate("user_id").lean().select("start_date end_date").exec(function(err, result) {
            output.TripDuration = result;
            for (var i = 0; i < result.length; i++) {
                var startTime = momentApi.getTime(result[i].start_date);
                var endTime = momentApi.getTime(result[i].end_date);
                var timeDiff = endTime - startTime;
                var timeDiffInMinutes = momentApi.getDifferenceinMinutes(timeDiff);
                var timeDiffInHours = momentApi.getDifferenceinHours(timeDiff);
                var duration = {};
                duration.hours = parseInt(timeDiffInHours);
                duration.minutes = timeDiffInMinutes;
                if (momentApi.getTimeFormat(startTime) === filterByDuration.time) {
                    output.TripDuration[i].duration = duration;
                } else {
                    output.TripDuration[i].duration = {};
                }
            }
        });
    }

    if (filterByLength && filterByLength.miles) {
        rideMaster.find({"miles":filterByLength.miles}).populate("bike_id").populate("user_id").lean().select("miles").exec(function(err, result) {
            output.TripLength = result;
        });
    }
    if (filterByPickup && filterByPickup.startLocation) {
        rideMaster.find({"start_place":filterByPickup.startLocation}).populate("bike_id").populate("user_id").lean().select("start_place").exec(function(err, result) {
            output.TripPickup = result;
        })
    }
    if (filterByDropoff && filterByDropoff.endLocation) {
        rideMaster.find({"end_place":filterByDropoff.endLocation}).populate("bike_id").populate("user_id").lean().select("end_place").exec(function(err, result) {
            output.TripDropoff = result;
        })
    }
    if (filterByBikes && filterByBikes.customer) {
        rideMaster.find({}).populate("bike_id").populate("user_id").lean().exec(function(err, result) {
            output.TripBikes = [{}];
            for (var i = 0; i < result.length; i++) {
                if(result[i].user_id.user_name === filterByBikes.customer)
                {
                    output.TripBikes[i] = result[i].user_id.user_name;
                }
                else
                {
                    output.TripBikes[i] = {};
                }
            }
            return callback(null, output);
        })
    }

}
module.exports = {
    getTripHistory: getTripHistory,
    getTripInfo: getTripInfo
}
