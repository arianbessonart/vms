var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  createdAt: Date,
  createdBy: String,
  updatedAt: Date,
  updatedBy: String
});

userSchema.pre('save', function(next) {

  var currentDate = new Date();

  this.updatedAt = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
