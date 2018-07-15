var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User = require('../models/user');
var userController = require('../controllers/UserController');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    User.findOne({
        'username': username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: 'Username is already taken.'
            });
        }
        var newUser = new User({
            username: username,
            password: password
        })
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    userController.getByUsername(req.body.username, (err, user) => {
        if (err || !user) {
            return done(err);
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!user.isActive){
                return done(err);
            }
            if (isMatch) {
                // Password correct
                return done(null, user)
            } else {
                return done(null, false);
            }
        });
    })
}));