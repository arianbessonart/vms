var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InvoiceItemSchema = new Schema({
  detail: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  amount: Number,
});

const invoiceSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  date: { type: Date, required: true },
  items: [InvoiceItemSchema],
  iva: Number,
  subTotal: Number,
  total: Number,
  status: { type: String, enum: ['pending', 'charged', 'canceled'], default: 'pending' },
  retention: { type: Boolean, default: false },
  dateBilled: Date,
  createdAt: Date,
  createdBy: String,
  updatedAt: Date,
  updatedBy: String,
});

invoiceSchema.pre('save', (next) => {
  const currentDate = new Date();

  this.updatedAt = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
