const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requesterBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', 
    required: true
  },
  recipientBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', 
    required: true
  },
  status: {
    type: String,
    enum: ['Pendiente', 'Aceptado por ambos', 'Rechazado', 'Completado'],
    default: 'Pendiente',
    required: true
  },
  requesterAccepted: {
    type: Boolean,
    default: false
  },
  recipientAccepted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

exchangeSchema.pre('save', (next) => {
  this.updatedAt = Date.now();
  next();
});

const Exchange = mongoose.model('Exchange', exchangeSchema);
module.exports = Exchange;
