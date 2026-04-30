const express = require('express');
const router = express.Router();
const Application = require('../model/application');
const Job = require('../model/job');
const { upload, cloudinary } = require('../config/cloudinary');
const dotenv = require('dotenv');
dotenv.config();
const { authenticate } = require('../middleware/authMiddleware');

// ---- POST /apply  –  Submit an application with resume ----
router.post(
  '/apply',
  authenticate,
  (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
      if (err) {
        console.error('Multer upload error:', err);
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
        }
        return res.status(400).json({ message: err.message || 'File upload failed' });
      }
      next();
    });
  },
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
      await Job.findByIdAndUpdate(jobId, { $inc: { applied: 1 } });
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


router.get("/get-applicants" , authenticate , async (req , res  )=>{
     try{ 
        const applicants = await Application.find({applicant : req.userId}).populate("job" , "jobTitle companyName location jobType salary salaryType").sort({createdAt : -1});
        res.status(200).json(applicants)
     }catch( error){
    
       console.error('Fetch job applications error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
})

router.delete("/:applicationId" , authenticate , async( req , res )=>{
  const applicationId =      req.params.applicationId
  try{
    await  Application.findOneAndDelete({_id : applicationId})
    res.status(200).json({message : " Data delete ! "})
    // console.log(applicationId
  }catch(error){
    console.log(error)
    return res.status(500).json({ message: 'Server error' });
    
  }
})


router.patch("/updateStatus" , authenticate , async ( req , res )=>{
    const { applicantId , status } = req.body
      try{
        let data =   await Application.findByIdAndUpdate(applicantId ,{status})
        if(!data){
            return res.status(404).json({ message: "Application not found" })
        }
        res.status(200).json({ message : " status update successful ! "})

      }catch(error){
        console.log(error)
        res.status(500).json({message : "server Error !"})
      }
})

module.exports = router;
