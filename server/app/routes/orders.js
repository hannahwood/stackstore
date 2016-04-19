'use strict';
const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const User = mongoose.model('User');
const CartItem = mongoose.model('CartItem');

/*
show one order 
	GET /:userId/:orderId
show users orders
	GET /:userId
create new order
	POST /:userId


ADMIN:
show all orders
	GET /
edit one order
	PUT /:userId/:orderId
*/


//show all items in one order
router.get('/:userId/:orderId', function(req, res, next) {
	CartItem.find({order: req.params.orderId})
	.then(function(items) {
		res.json(items);
	})
	.then(null, next);
});

//show users orders
router.get('/:userId', function(req, res, next) {
	Order.find({user: req.params.userId})
	.then(function(orders) {
		res.json(orders);
	})
	.then(null, next);
});

//create new order
router.post('/:userId', function(req, res, next) {
	Order.create(req.body)
	.then(function(order){
		res.json(order);
	})
	.then(null,next);
});

//show all orders
router.get('/', function(req, res, next) {
	Order.find({})
	.then(function(orders){
		res.json(orders);
	})
	.then(null, next);
});

//edit one order
router.put('/:userId/:orderId', function(req, res, next) {
	Order.findById(req.params.orderId)
	.then(function(order){
		order.set(req.body);
		return order.save();
	})
	.then(function(order){
		res.json(order);
	})
	.then(null, next);
});
