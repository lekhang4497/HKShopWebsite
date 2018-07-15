var express = require('express');
var router = express.Router();
var Order = require('../models/order');

const {
    OnePayDomestic
} = require('vn-payments');
const {
    OnePayInternational
} = require('vn-payments');

const onepayIntl = new OnePayInternational({
    paymentGateway: 'https://mtf.onepay.vn/vpcpay/vpcpay.op',
    merchant: 'TESTONEPAY',
    accessCode: '6BEB2546',
    secureSecret: '6D0870CDE5F24F34F3915FB0045120DB',
});

router.post('/checkout', (req, res) => {
    const params = Object.assign({}, req.body);
    // check cart
    if (!req.session.cart) {
        return res.redirect('/');
    }
    var totalPrice = req.session.cart.totalPrice;
    // construct checkout payload from form data and app's defaults
    const now = new Date();
    const checkoutData = {
        clientIp: '127.0.0.1',
        amount: totalPrice,
        customerId: params.email,
        currency: 'VND',
        againLink: 'http://localhost:3000/', // back URL when user cancel payment,
        returnUrl: 'http://localhost:3000/vn-payment/callback',
        orderId: `node-${now.toISOString()}`,
        transactionId: `node-${now.toISOString()}`
        /*...*/
    };

    // buildCheckoutUrl is async operation and will return a Promise
    onepayIntl
        .buildCheckoutUrl(checkoutData)
        .then(checkoutUrl => {
            res.writeHead(301, {
                Location: checkoutUrl.href
            });
            res.end();
        })
        .catch(err => {
            res.send(err);
        });
});

function getCartItems(cart, includeId = false) {
    var items = [];
    var cartItems = cart.items;
    Object.keys(cartItems).forEach((key) => {
        var pushItem = {
            name: cartItems[key].item.name,
            price: cartItems[key].item.price,
            currency: 'VND',
            quantity: cartItems[key].qty
        };
        if (includeId) {
            pushItem.productId = cartItems[key].item._id;
        }
        items.push(pushItem);
    });
    return items;
}

function calculateTotalPrice(items) {
    var totalPrice = 0;
    items.forEach(item => {
        totalPrice += item.quantity * item.price;
    });
    totalPrice = totalPrice.toFixed(2);
    return totalPrice;
}

router.get('/callback', (req, res) => {
    const query = req.query;

    onepayIntl.verifyReturnUrl(query).then(results => {
        if (results.isSuccess) {
            // Save order
            var items = getCartItems(req.session.cart, true);
            var totalPrice = calculateTotalPrice(items);

            var order = {
                paymentMethod: 'OnePay',
                address: results.billingStreet + ' - ' + results.billingStateProvince,
                totalPrice: totalPrice,
                currency: 'VND',
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
                return res.redirect('/order');
            });
        } else {
            res.send('Onepay - payment cancelled');
        }
    });
});

router.post('/cod', (req, res) => {
    // Save order
    var items = getCartItems(req.session.cart, true);
    var totalPrice = calculateTotalPrice(items);

    var order = {
        paymentMethod: 'COD',
        address: req.body.codAddress,
        totalPrice: totalPrice,
        currency: 'VND',
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
        return res.redirect('/order');
    });
});

module.exports = router;