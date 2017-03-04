var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  name: { type: String, required: true },
  rut: { type: String, minlength: 12, maxlength: 12, required: true },
  address: String,
  createdAt: Date,
  updatedAt: Date,
});

clientSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updatedAt = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

var Client = mongoose.model('Client', clientSchema);

module.exports = Client;
