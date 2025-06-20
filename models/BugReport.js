const mongoose = require('mongoose');

const bugReportSchema = new mongoose.Schema({
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BugReport', bugReportSchema);