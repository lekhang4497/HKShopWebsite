var controller = {};
var mongoose = require('mongoose');
var Product = require('../models/product');

controller.getAll = function (callback) {
    Product.find({}, callback);
};

controller.getById = function (id, callback) {
    Product.findOne({
        _id: id
    }, callback);
}

controller.save = (product, callback) => {
    var saveProduct = new Product(product);
    saveProduct.save(callback)
}

controller.delete = (id, callback) => {
    Product.deleteOne({
        _id: id
    }, callback);
}

controller.update = (product, id, callback) => {
    Product.findOneAndUpdate({
        _id: id
    }, product, callback);
}
module.exports = controller;