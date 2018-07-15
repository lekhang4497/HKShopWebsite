var controller = {};
var mongoose = require('mongoose');
var User = require('../models/user');

controller.getAll = function (callback) {
    User.find({}, callback);
};

controller.getByUsername = function (username, callback) {
    User.findOne({
        username: username
    }, callback);
}

controller.save = (user, callback) => {
    var saveUser = new User(user);
    saveUser.save(callback)
}

controller.delete = (id, callback) => {
    User.deleteOne({
        _id: id
    }, callback);
}

controller.update = (user, id, callback) => {
    User.findOneAndUpdate({
        _id: id
    }, user, callback);
}
module.exports = controller;