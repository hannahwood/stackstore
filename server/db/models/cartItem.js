'use strict';
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: function(amount) {
        return Math.floor(amount) === amount;
      },
      message: 'Amount must be a whole number'
    }
  },
  product: {
    type: mongoose.Schema.ObjectId, ref: 'Product',
    required: true
  }
});


mongoose.model('CartItem', cartSchema);
