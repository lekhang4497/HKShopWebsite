var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var productController = require('../controllers/ProductController');

router.get('/add/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});

    productController.getById(productId, function (err, product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        res.json({
            success: true
        });
    });
});

router.get('/remove/:id', (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});
    cart.remove(productId);
    req.session.cart = cart;
    res.json({
        success: true
    });
});

router.get('/reduce/:id', (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});
    cart.reduce(productId);
    req.session.cart = cart;
    res.json({
        success: true
    });
});


router.get('/', (req, res, next) => {
    if (!req.session.cart) {
        return res.render('cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart.items);
    res.render('cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
});

module.exports = router;