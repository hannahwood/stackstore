const mongoose = require('mongoose');

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
		required: true,
		enum: ['created', 'processing', 'cancelled', 'completed']
	}
});

mongoose.model('Order', orderSchema);