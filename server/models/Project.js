const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  teamName: String,
  contestName: String,
  githubLink: String,
  leaderName: String,
  guideName: String, // ✅ NEW
  teamMembers: [String], // ✅ NEW
  finalsDate: Date, // ✅ NEW
  year: Number, // ✅ NEW
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
