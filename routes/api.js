var express = require('express');
var router = express.Router();
var productController = require('../controllers/ProductController');
var Product = require('../models/product');
var User = require('../models/user');
var Order = require('../models/order');
var jwt = require('jsonwebtoken');
const SECRET = 'helloworld';

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'Admin') {
        return next();
    }
    res.redirect('/');
}

function jwtVerify(req, res, next) {
    var token = req.headers.authentication;
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err)
            return res.status(403).json({
                status: 'error'
            });
        next();
    });
}

router.use(isAdmin);

router.get('/product/:id', (req, res, next) => {
    var productId = req.params.id;
    productController.getById(productId, (err, product) => {
        if (err) {
            return res.status(401).json({});
        }
        res.status(200).json(product);
    });
});

router.put('/product/:id', jwtVerify, (req, res, next) => {
    var productId = req.params.id;
    var newProduct = req.body;
    Product.findByIdAndUpdate(productId, newProduct, (err, product) => {
        if (err) {
            return res.status(401).json({
                status: 'error'
            });
        }
        res.status(200).json(product);
    });
});

router.delete('/product/:id', jwtVerify, (req, res, next) => {
    var productId = req.params.id;
    Product.findByIdAndRemove(productId, (err) => {
        if (err) {
            return res.status(401).json({
                status: 'error'
            });
        }
        res.status(200).json({
            status: 'success'
        });
    });
});

router.delete('/order/:id', (req, res, next) => {
    var orderId = req.params.id;
    Order.findByIdAndUpdate(orderId, {
        isActive: false
    }, (err, order) => {
        if (err) {
            return res.status(401).json({
                status: 'error'
            });
        }
        res.status(200).json({
            order
        });
    });
});

router.put('/user/disable/:id', (req, res) => {
    var userId = req.params.id;
    User.findByIdAndUpdate(userId, {
        isActive: false
    }, (err, user) => {
        if (err)
            res.status(401).json({
                status: 'error'
            });
        res.status(200).json(user);
    });
});

router.put('/user/enable/:id', (req, res) => {
    var userId = req.params.id;
    User.findByIdAndUpdate(userId, {
        isActive: true
    }, (err, user) => {
        if (err)
            res.status(401).json({
                status: 'error'
            });
        res.status(200).json(user);
    });
});

router.post('/product', function (req, res) {
    var product = req.body;
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var file = req.files.image;

    // Use the mv() method to place the file somewhere on your server
    var imagePath = '/images/product/' + (Math.random() * 100000).toFixed() + '.jpg';
    var fileName = 'public' + imagePath;
    file.mv(fileName, function (err) {
        if (err)
            return res.status(500).send(err);
        product.imagePath = imagePath;
        saveProduct = new Product(product);
        saveProduct.save((err) => {
            if (err)
                return res.status(500).send(err);
            res.redirect('back');
        })
    });
});

router.get('/order/data', (req, res, next) => {
    var start = new Date(req.query.start);
    var end = new Date(req.query.end);
    Order.find({
        createdAt: {
            $gte: start,
            $lte: end
        }
    }, (err, orders) => {
        if (err)
            res.status(400).json({
                status: 'error'
            });
        res.status(200).json(orders);
    })
});

function containsProduct(order, productId) {
    var ret = false;
    var quantity = 0;
    order.items.forEach((item) => {
        if (item.productId == productId) {
            ret = true;
            quantity = item.quantity;
        }
    });
    return {
        ret: ret,
        quantity: quantity
    };
}

router.post('/order/data_compare', (req, res, next) => {
    var idList = req.body['data[]'];
    var dataMap = {}; // productId -> orders that contains this product
    var start = new Date(req.body.start);
    var end = new Date(req.body.end);
    Order.find({
        createdAt: {
            $gte: start,
            $lte: end
        }
    }, (err, orders) => {
        if (err)
            res.status(400).json({
                status: 'error'
            });
        idList.forEach((id) => {
            var quantity = 0;
            var findOrders = orders.filter((order) => {
                var result = containsProduct(order, id);
                quantity += result.quantity;
                return result.ret;
            });
            dataMap[id] = findOrders;
        });
        res.status(200).json(dataMap);
    })
})

module.exports = router;