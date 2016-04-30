'use strict';
var pg = require('pg');

function DBConnection(connectionString) {
    this.connString = connectionString;
}

DBConnection.prototype.client = function(callback) {
    var self = this
    pg.defaults.ssl = true;
    pg.connect(this.connString, function(err, client, done) {

        if(err) {
            if(err.code === 'ECONNREFUSED') {
                throw new Error('Could not connect to postgres at ' + self.connString)
            }
            throw err
        }
        callback(client, function() {
            console.log("Connected to DB");
            done();
        })
    });
}

DBConnection.prototype.end = function() {
    // WARNING: global effect
    pg.end();
}
DBConnection.prototype.queryJoin = function(queryString, callback) {
    this.client(function(client, done) {
        client.query(queryString, function(err, result) {
            done();
            if(err) {
                // console.log(err)
                var errorWrapper = new Error('SQL query failed: ' + err.message)
                errorWrapper.queryString = queryString
                errorWrapper.source = err
                callback(errorWrapper, undefined)
            } else {
                callback(undefined, result)
            }

        })
    })
}
DBConnection.prototype.querySelect = function(queryString, callback) {
    this.client(function(client, done) {
        client.query(queryString, function(err, result) {
            done();
            if(err) {
                // console.log(err)
                var errorWrapper = new Error('SQL query failed: ' + err.message)
                errorWrapper.queryString = queryString
                errorWrapper.source = err
                callback(errorWrapper, undefined)
            } else {
                callback(undefined, result)
            }

        })
    })
}
DBConnection.prototype.query = function(queryString, values, callback) {
    this.client(function(client, done) {
        client.query(queryString, values, function(err, result) {
            done();
            if(err) {
                // console.log(err)
                var errorWrapper = new Error('SQL query failed: ' + err.message)
                errorWrapper.queryString = queryString
                errorWrapper.values = values
                errorWrapper.source = err
                callback(errorWrapper, undefined)
            } else {
                callback(undefined, result)
            }

        })
    })
}

module.exports = DBConnection;
