'use strict';
const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Auth = require('../../utils/auth.middleware');

// get all products
router.get('/', function(req, res, next) {
	Product.getAllProductsAndCategories() //getAllProductsAndCategories returns an obj with 'products' and 'categories' keys
	.then(function(responseObj) {
		res.json(responseObj);
	})
	.then(null, next);
});

// get one product by id
router.get('/:productId', function(req, res, next) {
	Product.getProductDataById(req.params.productId) //getProductDataById returns an obj with 'product' and 'reviews" keys
	.then(function(responseObj) {
        res.json(responseObj);
	})
	.then(null, next);
});

// add one product (admin)
router.post('/', Auth.assertAdmin, function(req, res, next) {
	Product.create(req.body)
	.then(function(product) {
		res.json(product);
	})
	.then(null, next);
});

// edit one product (admin)
router.put('/:productId', Auth.assertAdmin, function(req, res, next) {
	Product.findById(req.params.productId)
	.then(function(product) {
		product.set(req.body);
		return product.save();
	})
	.then(function(product) {
		res.json(product);
	})
	.then(null, next);
});
