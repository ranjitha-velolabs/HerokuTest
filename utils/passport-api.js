var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var authenticationDao = require('./../routes/dao/authentication-dao.js');
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    authenticationDao.queryBySessionId(id, function(err, user) {
        done(err, user);
    });
});
passport.use('register', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        authenticationDao.createUser(req, email, password,function(err, user)
        {
            return done(null,user);
        })
    }
));
passport.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        authenticationDao.findUser(email, password, function(err, user)
        {
            return done(null,user);
        });
    }
    )
);
module.exports = passport;
