var mongoose = require('mongoose');
var studentsSchema = mongoose.Schema({
  name: String,
  age: Number,
  ph: Number,  
});
var studentmodel = mongoose.model("student", studentsSchema, "students");

module.exports = studentmodel;

