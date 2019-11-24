const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:  {
    type: String,
    required: [true, 'please input name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'please input email']
  },
  password: {
    type: String,
    required: [true, 'please input password']
  },
  projects_id:[{
      type: Schema.Types.ObjectId, ref: 'Project'
  }],
  todos_id: [{
      type: Schema.Types.ObjectId, ref: 'Todo'
  }]
},{
  timestamps: true
})

userSchema.plugin(uniqueValidator, {message: '{PATH} is already registered'})

const User = mongoose.model('User', userSchema);

module.exports = User