'use strict';
const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

/*
get all products 
	GET /
get one product by id 
	GET /:productId

ADMIN:
add one product
	POST /
edit one product
	PUT /:productId
*/

// get all products 
router.get('/', function(req, res, next) {
	Product.find({})
	.then(function(products) {
		res.json(products);
	})
	.then(null, next);
});

// get one product by id 
router.get('/:productId', function(req, res, next) {
	Product.findById(req.params.productId)
	.then(function(product) {
		res.json(product);
	})
	.then(null, next);
});

// add one product
router.post('/', function(req, res, next) {
	Product.create(req.body)
	.then(function(product) {
		res.json(product);
	})
	.then(null, next);
});

// edit one product
router.put('/:productId', function(req, res, next) {
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
