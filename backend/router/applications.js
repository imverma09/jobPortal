const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Application = require('../model/application');
const { upload, cloudinary } = require('../config/cloudinary');
const dotenv = require('dotenv');
dotenv.config();

// ---- Auth middleware (reusable) ----
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Please login first' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ---- POST /apply  –  Submit an application with resume ----
router.post(
  '/apply',
  authenticate,
  upload.single('resume'),          // field name from the frontend FormData
  async (req, res) => {
    try {
      const { jobId, fullName, email, phone, coverLetter } = req.body;

      if (!jobId || !fullName || !email) {
        return res.status(400).json({ message: 'Job ID, full name, and email are required' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Resume file is required' });
      }

      // Check if already applied
      const existing = await Application.findOne({ job: jobId, applicant: req.userId });
      if (existing) {
        // Delete the just-uploaded file since we won't use it
        if (req.file.filename) {
          await cloudinary.uploader.destroy(req.file.filename, { resource_type: 'raw' });
        }
        return res.status(409).json({ message: 'You have already applied for this job' });
      }

      const application = new Application({
        job: jobId,
        applicant: req.userId,
        fullName,
        email,
        phone,
        coverLetter,
        resumeUrl: req.file.path,                // Cloudinary URL
        resumePublicId: req.file.filename,       // Cloudinary public_id
      });

      await application.save();

      return res.status(201).json({ message: 'Application submitted successfully!', application });
    } catch (err) {
      console.error('Application submit error:', err);

      // Duplicate key error (compound index)
      if (err.code === 11000) {
        return res.status(409).json({ message: 'You have already applied for this job' });
      }

      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// ---- GET /my-applications  –  Get current user's applications ----
router.get('/my-applications', authenticate, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.userId })
      .populate('job', 'jobTitle companyName location jobType salary salaryType')
      .sort({ createdAt: -1 });

    return res.status(200).json(applications);
  } catch (err) {
    console.error('Fetch applications error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ---- GET /job/:jobId  –  Get all applications for a specific job (for employers) ----
router.get('/job/:jobId', authenticate, async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'fullName email')
      .sort({ createdAt: -1 });

    return res.status(200).json(applications);
  } catch (err) {
    console.error('Fetch job applications error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
