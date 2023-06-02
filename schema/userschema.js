var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//var Schema = mongoose.Schema;

var userSchema =  mongoose.Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
  ph: Number,
  type: String
});

userSchema.pre('save', async function (next) {
  // const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}



var usermodel = mongoose.model("user", userSchema, "Users");

module.exports = usermodel;
