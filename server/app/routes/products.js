'use strict';
const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Review = mongoose.model('Review');
const Auth = require('../../utils/auth.middleware');

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
	let responseObject = {};

    Product.findById(req.params.productId)
	.then(function(product) {
        responseObject.product = product;
        return product._id;
	})
    .then(function(productId) {
        return Review.find({product: productId}).exec();
    })
    .then(function(reviews) {
        responseObject.reviews = reviews;
        res.json(responseObject);
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
