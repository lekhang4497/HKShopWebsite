var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    imagePath: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    color: {type: String},
    size: {type: String},
    price: {type: Number, required: true},
    isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model('Product', ProductSchema, 'products');