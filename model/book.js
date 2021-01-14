var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		trim: true
	},
	author: {
		type: String,
		required: true
	},
	isBorrowed: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Book', BookSchema);