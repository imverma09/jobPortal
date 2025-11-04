// routes/jobs.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Job = require('../model/job');
const router = express.Router();

router.post('/postJob',

  [
    body('jobTitle').notEmpty().withMessage('Job title is required'),
    body('companyName').notEmpty().withMessage('Company name is required'),
    body('contactEmail').optional().isEmail().withMessage('Invalid email'),
    body('salaryType').optional().isIn(['yearly', 'monthly', 'hourly']).withMessage('Invalid salaryType'),
    body('applicationDeadline').optional().isISO8601().toDate().withMessage('Invalid date for applicationDeadline'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    try {
      const {
        jobTitle,
        jobCategory,
        jobType,
        experience,
        salary,
        salaryType = 'yearly',
        description,
        responsibilities,
        requirements,
        benefits,
        skills,
        companyName,
        companyWebsite,
        location,
        contactEmail,
        contactPhone,
        applicationDeadline,
        createdBy , 
      } = req.body;

      // Normalize skills: accept array or comma-separated string
      let skillsArray = [];
      if (Array.isArray(skills)) {
        skillsArray = skills.map(s => String(s).trim()).filter(Boolean);
      } else if (typeof skills === 'string' && skills.trim().length) {
        skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
      }

      const job = new Job({
        jobTitle,
        jobCategory,
        jobType,
        experience,
        salary,
        salaryType,
        description,
        responsibilities,
        requirements,
        benefits,
        skills: skillsArray,
        companyName,
        companyWebsite,
        location,
        contactEmail,
        contactPhone,
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : undefined,
        createdBy
      });

      await job.save();

      return res.status(201).json({ message: 'Job created', job });
    } catch (err) {
      console.error('Create job error', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

router.get('/getJob', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Fetch jobs error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).json({ error: 'Job not found' });
//     res.status(200).json(job);
//   } catch (err) {
//     console.error('Fetch job error', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
module.exports = router;
