var express = require('express');
var User = require('../models/user');
var userController = require('../controllers/UserController');
var Order = require('../models/order');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var jwt = require('jsonwebtoken');
const SECRET = 'helloworld'

var csrfProtection = csrf();
router.use(csrfProtection);

const request = require('request');

router.get('/profile', isLoggedIn, (req, res, next) => {
    var user = req.user;
    res.render('profile', {
        user: user,
        csrfToken: req.csrfToken()
    });
})

router.get('/login', isNotLoggedIn, (req, res, next) => {
    res.render('login', {
        layout: false,
        csrfToken: req.csrfToken()
    });
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local.signin', function (error, user, info) {
        if (error || !user) {
            return res.status(403).json();
        }
        // Log in user
        req.logIn(user, function (err) {
            if (err) return next(err);
            var token = jwt.sign(user.toJSON(), SECRET);
            return res.json({
                user: user,
                token: token
            });
        });
    })(req, res, next);
})

router.get('/register', (req, res, next) => {
    var messages = req.flash('error');
    res.render('register', {
        layout: false,
        csrfToken: req.csrfToken()
    });
})

router.post('/register', validateCaptcha, (req, res, next) => {
    passport.authenticate('local.signup', function (error, user, info) {
        if (error) {
            return res.status(401).json();
        }
        if (!user) {
            var message;
            if (info) {
                message = info.message;
            }
            return res.json({
                status: 'error',
                message: message
            })
        }
        req.logIn(user, function (err) {
            if (err) return next(err);
            return res.json(user);
        });
    })(req, res, next);
});

router.put('/:id', (req, res, next) => {
    var userId = req.params.id;
    var body = req.body;
    User.findByIdAndUpdate(userId, body, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        return res.json({
            success: true
        });
    })
})

router.put('/password/:id', isLoggedIn, (req, res, next) => {
    var userId = req.params.id;
    var body = req.body;
    if (!body || !body.password || !body.oldPassword) {
        return res.json({
            success: false
        });
    }
    User.findById(userId, (err, user) => {
        if (err) {
            throw err;
        }
        user.comparePassword(body.oldPassword, function (err, isMatch) {
            if (err) {
                return res.json({
                    success: false
                });
            }
            if (isMatch) {
                // Password correct
                user.password = body.password;
                user.save();
                return res.json({
                    success: true
                });
            } else {
                return res.json({
                    success: false
                });
            }
        });
    });
})

function validateCaptcha(req, res, next) {
    if (
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null
    ) {
        return res.json({
            "success": false,
            "msg": "Please select captcha"
        });
    }

    // Secret Key
    const secretKey = '<Enter your secret key>';

    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    // Make Request To VerifyURL
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);

        // If Not Successful
        if (body.success !== undefined && !body.success) {
            return res.json({
                "success": false,
                "msg": "Captcha is not checked"
            });
        }

        //If Successful - move to next step
        next();
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;