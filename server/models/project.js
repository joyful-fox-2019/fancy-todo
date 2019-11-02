const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'why no name?'],
    min: [5, 'min 5 char']
  },
  Members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  Todo: [
    {
      type: Schema.Types.ObjectId,
      ref: 'todos'
    }
  ],
  createdAt: Date,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

ProjectSchema.pre('save', function(next) {
  const date = new Date();
  this.createdAt = date.toLocaleString();
  this.Members = [];
  this.Todo = [];
  next()
})

const Project = Mongoose.model('projects', ProjectSchema);


module.exports = Project;