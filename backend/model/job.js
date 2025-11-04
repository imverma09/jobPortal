// models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true, trim: true },
  jobCategory: { type: String, trim: true },
  jobType: { type: String, trim: true }, // e.g. "Full-time", "Part-time", "Contract"
  experience: { type: String, trim: true }, // keep string to allow "1-3 years" etc.
  salary: { type: String, trim: true }, // keep flexible; could be "40000-60000"
  salaryType: { type: String, enum: ['yearly', 'monthly', 'hourly'], default: 'yearly' },
  description: { type: String, trim: true },
  responsibilities: { type: String, trim: true },
  requirements: { type: String, trim: true },
  benefits: { type: String, trim: true },
  skills: [{ type: String, trim: true }], // array of skill strings
  companyName: { type: String, required: true, trim: true },
  companyWebsite: { type: String, trim: true },
  location: { type: String, trim: true },
  contactEmail: { type: String, trim: true, lowercase: true },
  contactPhone: { type: String, trim: true },
  applicationDeadline: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);
