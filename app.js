'use strict';
var path = require('path');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
require('./routes/config/db-config.js');
var passportApi = require('./utils/passport-api');
var rides = require('./routes/services/trip-explorer-service.js');
var api = require('./routes/services/login.js');
var analyticsPoints = require('./routes/analytics-points');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passportApi.initialize());
app.use(passportApi.session());

app.use('/', routes);
app.use('/api/user/', api);
app.all('/api/user/', function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/api/users/', users);
app.use('/api/rides/', rides);
app.use('/api/analytics-points', analyticsPoints);

app.set('view engine', 'jade');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
