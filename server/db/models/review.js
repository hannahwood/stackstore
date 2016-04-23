'use strict';
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
        required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
        required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		maxlength: 2000,
		minlength: 5,
		required: true
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	}
});

mongoose.model('Review', reviewSchema);
