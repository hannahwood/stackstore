'use strict';
/*global HttpError */

const Auth = require('../../utils/auth.middleware');
const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const User = mongoose.model('User');
const CartItem = mongoose.model('CartItem');

// Saves the document associated with the requested user to the req object.
router.param('userId', function(req, res, next, userId) {
  User.findById(userId)
  .then(function(user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
  })
  .catch(next);
});

//show all items in one order
router.get('/:userId/:orderId', Auth.assertAdminOrSelf, function(req, res, next) {
	CartItem.find({order: req.params.orderId})
	.then(function(items) {
		res.json(items);
	})
	.then(null, next);
});

//show users orders
router.get('/:userId', Auth.assertAdminOrSelf, function(req, res, next) {
	Order.find({user: req.params.userId})
	.then(function(orders) {
		res.json(orders);
	})
	.then(null, next);
});

//create new order
router.post('/:userId', Auth.assertAdminOrSelf, function(req, res, next) {
	Order.create({ user: req.params.userId })
	.then(function(order) {
		order.createItems(req.body.items);
	})
	.then(function(order){
		res.json(order);
	})
	.then(null,next);
});

//get all orders (admin)
router.get('/', Auth.assertAdmin, function(req, res, next) {
	Order.find({})
	.then(function(orders){
	   res.json(orders);
	})
	.then(null, next);
});

//edit one order (admin)
router.put('/:userId/:orderId', Auth.assertAdmin, function(req, res, next) {
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
