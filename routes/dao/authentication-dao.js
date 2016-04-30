'use strict';
var userAdmin = require('./../models/user-admin-master');
/*
 * Authentication process for sign up
 *
 * @param {Object} Express request object
 * @param {Object} email field that passed from client input
 * @param {Object} password field that passed from client input
 * @param {Object} Express response object
 */

userAdmin.createTable(function(err) {
    // table created
    if(err)
    {
        console.log("Error"+err);
    }

})

var createUser = function(req, email, password, done) {
    // find a user in Database with provided username
    console.log("hello");
    userAdmin.load({
        'entity':userAdmin._definition.name,
        'field': 'user_id',
        'value' : email
    }, function(err, user) {
        // In case of any error return
        if (err) {
            done(err);
        }
        else if(user)
        {
            done(null,false);
        }
        else {
            userAdmin.create({
                user_id: email, password: userAdmin.generateHash(password),
                firstName: req.body.firstName, lastName:req.body.lastName, del_status: 1
            }, function (err, createdEntity) {
                if (err) {
                    console.log(err);
                }
                done(null,createdEntity);
            });
        }
        return;
    });
};

/*
 * Authentication process for login
 *
 * @param {Object} email field that passed from client input
 * @param {Object} password field that passed from client input
 * @param {Object} Express response object
 */
var findUser = function(email, password, done) {
    userAdmin.load({
            'entity':userAdmin._definition.name,
            'field': 'user_id',
            'value' : email
        },
        function(err, user) {
            // In case of any error, return using the done method
            if (err)
                done(err);
            // Username does not exist, log the error and redirect back
            if (!user) {
                done(null, false);
            }
            // User exists but wrong password, log the error
            if (!userAdmin.validPassword(user[0].password, password)) {
                done(null, false); // redirect back to login page
            }
            else {
                // User and password both match, return user from done method
                // which will be treated like success
                done(null, user[0]);
            }
            return;
        }
    );

}
/*
 * Finding current authorized uer from session
 *
 * @param {Object} user id of current user
 * @param {Object} Express response object
 */
var queryBySessionId = function(id, done) {
    userAdmin.load({id:id},
        function(err, user) {
            done(err, user);
            return;
        });
}
module.exports = {
    createUser: createUser,
    findUser: findUser,
    queryBySessionId: queryBySessionId
}
