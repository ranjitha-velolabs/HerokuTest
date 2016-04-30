'use strict';

const jsonFile = require('jsonfile');
const config = require('./../config');
const fs = require('fs');

/*
 * Temporary method to generate points for user area density
 */
var generatePoints = function() {
    var points = [];
    for (var i=0; i < config.numberOfPoints; i++) {
        const latitudeSign = Math.floor(Math.random()*2)%2;
        const longitudeSign = Math.floor(Math.random()*2)%2;

        const latitude = Math.random()*90;
        const longitude = Math.random()*180;

        points.push({
            latitude: latitudeSign === 0 ? latitude : -1*latitude,
            longitude: longitudeSign === 0 ? longitude : -1*longitude
        });
    }

    return points;
};

/*
 * Handles logic for creating new points for user area density
 *
 * @param {Boolean} Forces new points to be created
 * @param {Function} Callback with params {error, points}
 */
module.exports = function (shouldCreateNewData, callback) {
    console.log('Generating', config.numberOfPoints, 'points');
    if (shouldCreateNewData || !fs.existsSync(config.filePaths.points)) {
        const dataPoints = generatePoints();
        jsonFile.writeFile(config.filePaths.points, dataPoints, function (error) {
            if (error) {
                // TODO leave this as a soft error for now. Should be added to log or
                // handled in another way when error handling is implemented
                console.log('Failed to write data to', config.filePaths.points);
            }
        });

        callback(null, dataPoints);
        return;
    }

    jsonFile.readFile(config.filePaths.points, function(error, data) {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, data);
    });
};
