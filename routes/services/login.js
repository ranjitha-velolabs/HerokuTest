'use strict';
var express = require('express');
var router = express.Router();
var jsonResponse = require('./../../utils/json-response');
var request = require('request');
var passportApi = require('./../../utils/passport-api');
/*
 *Signup for skylock backend
 */
router.post('/register', function(req, res,next) {
    console.log("hello");
    request({
        url: 'https://skylock-beta.herokuapp.com/api/v1/users/',
        method: 'POST',
        json: {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            user_id: req.body.email,
            password: req.body.password,
            fb_flag: "0",
            reg_id: "2045",
            email: req.body.email
        }
    }, function(error, response, body) {
        if (error) {
            var err = ({
                status: 'Internal Server Error!'
            });
            jsonResponse(res,500,err, null);
        }
    });
    passportApi.authenticate('register', function(err,user) {
        if(err)
        {
            var error = ({
                status: 'Internal server Error!'
            });
            jsonResponse(res,500,error, null);
        }
        if (!user) {
            var error = ({
                status: 'Error in SignUp!'
            });
            jsonResponse(res,401,error,null);
        }
        else {
            var payload = ({
                status: 'Registration successful!'
            });
            jsonResponse(res, 200, null, payload);
        }
    })(req, res, next);
});

//Login authentication
router.post('/login', function(req, res, next) {
    console.log(req);
    passportApi.authenticate('login', function(err, user) {
        if (err) {
            var error = ({
                status: 'Internal server Error!'
            });
            jsonResponse(res,500,error, null);
        }
        if (!user) {
            var error = ({
                status: 'Authentication Failed!'
            });
            jsonResponse(res,401,error,null);
        }
        else {
            var payload = ({
                status: 'Login successful!',
                name: user.first_name
            });
            jsonResponse(res, 200, null, payload);
        }
    })(req, res, next);
});

//Logout current user
router.get('/logout', function(req, res) {
    req.logout();
    var payload = ({
        status: 'Bye!'
    });
    jsonResponse(res,200,null, payload);
});

module.exports = router;
