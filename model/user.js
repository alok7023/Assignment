var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
		type: String,
        maxlength: 32,
        trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	borrowedBooks: [{
		book: {
			type: mongoose.Schema.ObjectId,
			ref: "Book"
		}
	}]
});

module.exports = mongoose.model('User', UserSchema);