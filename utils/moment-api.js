'use strict';
var moment = require('moment');
// Converts date to time for Trip Explorer Page
var getTime = function(date){
    return moment.utc(date.getTime());
}
// Provides time difference in Minutes for Trip Explorer Page
var getDifferenceinMinutes = function(timeDiff){
    return ((timeDiff)/ (60 * 1000) % 60);
}
// Provides time difference in Hours for Trip Explorer Page
var getDifferenceinHours = function(timeDiff){
    return ((timeDiff)/ (60 * 60 * 1000));
}
// Provides time Format in AM or PM for Trip Explorer Page
var getTimeFormat = function(time){
    return time.format('HH:mm a');
}
module.exports = {
    getTime:getTime,
    getDifferenceinMinutes:getDifferenceinMinutes,
    getDifferenceinHours:getDifferenceinHours,
    getTimeFormat:getTimeFormat
}
