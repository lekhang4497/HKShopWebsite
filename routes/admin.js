var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var productController = require('../controllers/ProductController');
var userController = require('../controllers/UserController');
var Order = require('../models/order');

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'Admin') {
    return next();
  }
  res.redirect('/');
}

router.use(isAdmin);

router.get('/', function (req, res, next) {
  productController.getAll((err, products) => {
    if (err)
      return res.send('Sorry, an error has occurred - HKShop');
    products.forEach(product => {
      product.stringified = JSON.stringify(product);
    });
    res.render('admin', {
      layout: 'admin',
      products: products
    });
  });
});

router.get('/user', function (req, res, next) {
  userController.getAll((err, users) => {
    if (err)
      return res.send('Sorry, an error has occurred - HKShop');
    res.render('admin-user', {
      layout: 'admin',
      users: users
    });
  })
});

router.get('/product', function (req, res, next) {
  productController.getAll((err, products) => {
    if (err)
      return res.send('Sorry, an error has occurred - HKShop');
    products.forEach(product => {
      product.stringified = JSON.stringify(product);
    });
    res.render('admin-product', {
      layout: 'admin',
      products: products
    });
  });
});

router.get('/order', (req, res, next) => {
  Order.find({}, (err, orders) => {
    if (err)
      return res.send('Sorry, an error has occurred - HKShop');
    res.render('admin-order', {
      layout: 'admin',
      orders: orders
    });
  });
})

module.exports = router;