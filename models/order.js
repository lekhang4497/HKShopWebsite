var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    totalPrice: {type: Number, require: true},
    items: [{
        productId: {type:Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number}
    }],
    currency: String,
    paymentMethod: {type: String},
    address: {type: String},
    isActive: {type:Boolean, required: true, default: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: {}
});

module.exports = mongoose.model('Order', OrderSchema);