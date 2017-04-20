var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');


const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  createdAt: Date,
  createdBy: String,
  updatedAt: Date,
  updatedBy: String,
});

userSchema.pre('save', (next) => {
  const currentDate = new Date();
  this.updatedAt = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

const User = mongoose.model('User', userSchema);

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
userSchema.methods.validPassword = (password) => bcrypt.compareSync(password, this.local.password);

module.exports = User;
