const mongoose = require('mongoose');

const systemStateSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedBy: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('SystemState', systemStateSchema);
