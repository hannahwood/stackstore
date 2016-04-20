'use strict';

const mongoose = require('mongoose');
const CartItem = mongoose.model('CartItem');
const Promise = require('Bluebird');

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		required: true,
		enum: ['created', 'processing', 'shipped', 'cancelled', 'completed'],
		default: 'created'
	}
});

// get total cost
orderSchema.methods.getTotalCost = function() {
	return CartItem.find({order: this._id})
	.then(function(items) {
		return items.reduce(function(sum, nextItem) {
			return sum + (nextItem.finalPrice * nextItem.quantity);
		}, 0);
	});
};

orderSchema.methods.createItems = function(items){
    const self = this;
	// once order created, create cart items with order #
	return Promise.map(items, function(item) {
		CartItem.create({
			order: self._id,
			quantity: item.quantity,
			finalPrice: item.finalPrice,
            product: item.product
		});
	})
	.then(function() {
		return self;
	});
};

mongoose.model('Order', orderSchema);

