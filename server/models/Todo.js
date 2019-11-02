const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	status: {
		type: String
	},
	due_date: {
		type: Date
	}
});

module.exports = model('User', todoSchema);
