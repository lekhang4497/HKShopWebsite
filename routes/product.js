var express = require('express');
var router = express.Router();
var productController = require('../controllers/ProductController');
var Product = require('../models/product');

router.get('/', function (req, res, next) {
  var id = req.params.id;
  var page = parseInt(req.query.page);
  page = isNaN(page) ? 1 : page;
  var limit = 20;
  productController.getAll((err, products) => {
    var start = (page - 1) * limit;
    var end = start + limit;
    var totalRows = products.length;
    res.render('product', {
      total: totalRows,
      products: products.slice(start, end),
      pagination: {
        page: page,
        limit: limit,
        totalRows: totalRows
      }
    });
  })
});

router.get('/:id', (req, res, next) => {
  var productId = req.params.id;
  productController.getById(productId, (err, product) => {
    if (err) {
      return res.redirect('/');
    }
    res.render('product-detail', {
      product: product
    });
  });
});

module.exports = router;