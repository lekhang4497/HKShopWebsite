var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Order = require('../models/order');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.get('/', isLoggedIn, (req, res, next) => {
  var userId = req.user._id;
  Order.find({
    user: userId
  }, (err, orders) => {
    if (err) {
      throw err;
    }
    orders.forEach(order => {
      order.createdAt = new Date(order.createdAt).toDateString();
    });
    res.render('order', {
      orders: orders
    });
  })
});

router.get('/:id', (req, res, next) => {
  var orderId = req.params.id;
  Order.findById(orderId).populate('items.productId').exec((err, order) => {
    if (err) {
      throw err;
    }
    Product.findById(order.items[0]._id, (err, res) => {
    });
    order.createdAt = new Date(order.createdAt).toDateString();
    res.render('order-detail', {
      order: order
    });
  });
})

router.get('/all', (req, res, next) => {});

module.exports = router;