'use strict';
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	title: {
		type: String
	},
	description: {
		type: String,
		maxlength: 2000,
		minlength: 5
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	}
});

mongoose.model('Review', reviewSchema);
