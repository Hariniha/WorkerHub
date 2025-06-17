const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skill: { type: String, required: true ,ref:"skills"},
  phone: { type: String, required: true },
  experience: { type: Number, required: true },
  serviceArea: { type: String, required: true },
  pincode: { type: String, required: true },
  availability: { type: String, required: true },
  languages: { type: [String], required: true },
  rating: { type: Number, default: 5.0 },
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);
