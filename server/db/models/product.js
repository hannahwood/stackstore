'use strict';
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	invQuantity: {
		type: Number,
		required: true
	},
	category: {
		type: [String],
		enum: ['books', 'clothing', 'bric-a-brac', 'crap'],// all category options
		required: true,
		validate: {
			validator: function(arr) {
				return arr.length;
			},
			message: 'Must assign at least one category'
		}
	},
	photo: {
		type: String
		// default: 'https://hr-avatars.s3.amazonaws.com/2af1ef57-b9d2-4528-8f50-57569e36c3ed/150x150.png' // some filler image
	}
});


mongoose.model('Product', productSchema);
