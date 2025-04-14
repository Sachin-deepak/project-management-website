const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  skills: [String],
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);
