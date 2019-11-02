const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const { hashPassword } = require('../helpers/hash');

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  username: {
    type: String,
    required: [true, 'username is required']
  },
  Invitation: [{
    type: Schema.Types.ObjectId,
    ref: 'projects'
  }]
})

UserSchema.pre('save', function(next) {
  this.password = hashPassword(this.password);
  this.Invitation= [];
  next();
})

const User = Mongoose.model('users', UserSchema);


module.exports = User;