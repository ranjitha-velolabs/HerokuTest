'use strict';

const cache = require('./cache');
const _ = require('underscore');
const pointCreator = require('./point-creator');

/*
 * This is a temporary method. It should be replaced with Machine Learning
 * implementation that predicts user area density
 *
 * @param {Object} Contains two points that define boundary on which to filter
 * @param {Array} All points from mock file
 * @param {Function} Callback with params {error, filteredPoints}
 */
var filterPoints = function(coordinates, points, callback) {
    var filteredPoints = [];
    _.each(points, function (point) {
        if (point.latitude >= coordinates.southWest.lat &&
            point.latitude <= coordinates.northEast.lat &&
            point.longitude >= coordinates.southWest.lng &&
            point.longitude <= coordinates.northEast.lng)
        {
            filteredPoints.push(point);
        }
    });

    callback(null, filteredPoints);
};

/*
 * Handles logic for filtering points
 *
 * @param {Object} Contains two points that define boundary on which to filter
 * @param {Function} Callback with params {error, filteredPoints}
 */
module.exports = function(coordinates, callback) {
    if (!_.has(coordinates, 'northEast') || !_.has(coordinates, 'southWest')) {
        callback(new Error('Not all coordinates supplied'), null);
        return;
    }

    if (_.has(cache, 'analyticsPoints') && cache.analyticsPoints && cache.analyticsPoints.length > 0) {
        filterPoints(coordinates, cache.analyticsPoints, callback);
        return;
    }

    pointCreator(false, function (error, points) {
        if (error) {
            console.log('error creating points:', error);
            callback(error, null);
            return;
        }

        cache['analyticsPoints'] = points;
        filterPoints(coordinates, points, callback);
    });
};
