'use strict';

const mongoose = require('mongoose');
const CartItem = mongoose.model('CartItem');
const Promise = require('bluebird');


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
	},
  cartItems: [CartItem.schema]
});

// get total cost
orderSchema.methods.getTotalCost = function() {
	return CartItem.find({order: this._id})
	.then(function(items) {
		return items.reduce(function(sum, nextItem) {
			return sum + (nextItem.product.price * nextItem.quantity);
		}, 0);
	});
};



orderSchema.methods.getTotalCost = function() {
  const self = this;
  return Promise.reduce(self.cartItems,function(sum, elem) {
    return sum += elem.price * elem.quantity;
  },0)
  .then(function(sum) {
    return sum;
  })
};

//04/22/2016 ==> ADD IMMACULATE LOGIC TO CONVERT PRODUCT ITEMS TO CARTITEMS
orderSchema.methods.createItems = function(items){
  const self = this;
	return Promise.map(items, function(item) {
		self.cartItems.push({'price' : item.product.price, 'product' : item.product._id, 'quantity' : item.quantity});
	})
	.then(function() {
		return self.save();
	});
};



mongoose.model('Order', orderSchema);
