const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required']
  },
  description: {
    type: String,
    required: [true, 'description is required']
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdAt: Date,
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: 'projects'
  },
  status: Boolean,
  due_date: Date
})

TodoSchema.pre('save', function(next) {
  this.ProjectId = null || this.ProjectId
  this.status = false;
  const date = new Date();
  this.createdAt = date.toLocaleString;
  next()
})

const Todo = Mongoose.model('todos', TodoSchema);

Todo.createCollection()
  .then( () => {
    console.log('Todo Collection Success Created!');
  })
  .catch(console.log)


module.exports = Todo;