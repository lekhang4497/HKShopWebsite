var express = require('express');
var router = express.Router();
var Order = require('../models/order');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': '<Enter your client id>',
    'client_secret': '<Enter your client secret>'
});

function calculateTotalPrice(items) {
    var totalPrice = 0;
    items.forEach(item => {
        totalPrice += item.quantity * item.price;
    });
    totalPrice = totalPrice.toFixed(2);
    return totalPrice;
}

function getCartItems(cart, includeId = false) {
    var items = [];
    var cartItems = cart.items;
    Object.keys(cartItems).forEach((key) => {
        var pushItem = {
            name: cartItems[key].item.name,
            price: (cartItems[key].item.price / 22000).toFixed(2),
            currency: 'USD',
            quantity: cartItems[key].qty
        };
        if (includeId) {
            pushItem.productId = cartItems[key].item._id;
        }
        items.push(pushItem);
    });
    return items;
}

router.post('/', (req, res) => {
    if (!req.session.cart) {
        return res.redirect('/');
    }
    var items = getCartItems(req.session.cart);
    var totalPrice = calculateTotalPrice(items);

    var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:3000/payment/success",
            cancel_url: "http://localhost:3000/payment/cancel"
        },
        transactions: [{
            item_list: {
                items: items
            },
            amount: {
                currency: "USD",
                total: totalPrice
            },
            description: "HKShop's shirt payment"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    var items = getCartItems(req.session.cart, true);
    var totalPrice = calculateTotalPrice(items);

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": totalPrice
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            // Save order
            var order = {
                totalPrice: totalPrice,
                currency: 'USD',
                items: []
            }
            items.forEach(item => {
                order.items.push({
                    productId: item.productId,
                    quantity: item.quantity
                })
            });
            if (req.isAuthenticated()) {
                order.user = req.user._id;
            }
            var saveOrder = new Order(order);
            saveOrder.save((err, order) => {
                if (err) {
                    throw err;
                }
                res.redirect('/order');
            });
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;