'use strict';
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

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

// Returns a promise for an array with every category currently used in the database.
productSchema.statics.getCategories = function() {
    return this.find() // Get all the products in the db
    .then(products => products.map(product => product.category)) // Returns an array of category arrays
    .then(categoryArrays => categoryArrays.reduce((arrayOfAllCategories, nextArray) => {
        let additionalCategories = nextArray.filter(category => arrayOfAllCategories.indexOf(category) === -1); // Returns array of categories not alreay in arrayOfAllCategories
        return arrayOfAllCategories.concat(additionalCategories);
    }, []));
};

// Returns a promise for a response object populated with a product document, all reviews related to the product, and all current product categories
productSchema.statics.getProductDataById = function(productId) {
    let responseObj = {};

    return this.getCategories()
    .then(categories => responseObj.categories = categories)
    .then(() => this.findById(productId))
    .then(product => {
        responseObj.product = product;
        return product;
    })
    .then(product => Review.find({product: product._id}))
    .then(reviews => {
        responseObj.reviews = reviews;
        return responseObj;
    });
};

mongoose.model('Product', productSchema);
