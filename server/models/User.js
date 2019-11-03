const { Schema, model, models } = require('mongoose');
const { passwordHandler } = require('../helpers');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	login_type: {
		type: String,
		enum: ['default', 'google']
	},
	username: {
		type: String,
		unique: function(v) {
			return this.username;
		}
	},
	email: {
		type: String,
		unique: true,
		validate: [
			{
				validator: function(v) {
					return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					);
				},
				msg: () => 'Invalid email format!'
			}
		],
		required: [true, 'User email required']
	},
	password: {
		type: String,
		required: [
			function(v) {
				return this.username;
			},
			'password required.'
		]
	},
	todos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Todo'
		}
	]
});

userSchema.plugin(uniqueValidator);
userSchema.post('validate', function(user, next) {
	if (user.password) {
		user.password = passwordHandler.hash(user.password);
	}
	next();
});

// userSchema.index({ username: 1 }, { unique: true, partialFilterExpression: { $type: String } });
// User = model('User', userSchema);

module.exports = model('User', userSchema);
