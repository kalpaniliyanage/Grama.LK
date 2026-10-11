const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleSi: { type: String, required: true },
  titleTa: { type: String },
  bodyEn: { type: String, required: true },
  bodySi: { type: String, required: true },
  bodyTa: { type: String },
  category: { type: String, default: 'Health' },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);