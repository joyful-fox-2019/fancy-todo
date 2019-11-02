const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	todos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Todo'
		}
	]
});

module.exports = model('User', userSchema);
