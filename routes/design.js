var express = require('express');
var fs = require('fs');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var productController = require('../controllers/ProductController');

router.get('/', function (req, res, next) {
  res.render('design');
});

router.post('/', (req, res, next) => {
  var creator = '';
  if (!req.isAuthenticated()) {
    creator = 'Anonymous';
  } else {
    creator = req.user._id;
  }
  var img = req.body.image;
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  var productName = creator + '-' + (Math.random() * 10000).toFixed();
  var imagePath = '/images/product/' + productName + '.png';
  fileName = 'public' + imagePath;
  fs.writeFile(fileName, buf, (err) => {
    if (err)
      return res.status(401).json({
        status: 'error'
      });
    // save design
    var saveProduct = new Product({
      name: productName,
      imagePath: imagePath,
      description: 'User design',
      price: 50000
    });
    saveProduct.save((err, product) => {
      // add to cart
      var productId = product._id;
      var cart = new Cart(req.session.cart ? req.session.cart.items : {});
      productController.getById(productId, function (err, product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        res.json({
          success: true
        });
      });
    });
  });
})

module.exports = router;