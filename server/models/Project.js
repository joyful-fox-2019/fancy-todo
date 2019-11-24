const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name:  {
    type: String,
    required: [true, 'please input name']
  },
  todos_id:[{
      type: Schema.Types.ObjectId, ref: 'Todo'
  }],
  users_id: [{
      type: Schema.Types.ObjectId, ref: 'User'
  }]
},{
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project