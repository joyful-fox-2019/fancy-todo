const { Schema, model } = require('mongoose');
const { models } = require('mongoose');

const todoSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Todo Name Required!']
	},
	description: {
		type: String
	},
	status: {
		type: Boolean,
		default: false
	},
	due_date: {
		type: Date
	},
	user_id: { type: Schema.Types.ObjectId, ref: 'User' }
});

todoSchema.post('save', function(doc, next) {
	models.User.findByIdAndUpdate(
		doc.user_id,
		{ $push: { todos: doc.id } },
		{ useFindAndModify: false }
	)
		.then(() => {
			next();
		})
		.catch(err => {
			next(err);
		});
});

module.exports = model('Todo', todoSchema);
