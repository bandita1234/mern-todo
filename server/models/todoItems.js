const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoItemSchema = new Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
    unique:true
  },
  date: {
    type: Date,
    // required: true
  },
  status:{
    type:String,
    enum:["active","inactive"],
    default:"active"
  }
});

module.exports = mongoose.model('todo', TodoItemSchema);