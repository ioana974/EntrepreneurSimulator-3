const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  userAgent: { type: String },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visit', VisitSchema);
