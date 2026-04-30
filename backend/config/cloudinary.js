const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'jobPortal/resumes',
    resource_type: 'raw',              // raw = non-image files (PDF, DOCX)
    // Don't use allowed_formats for raw uploads — Cloudinary rejects doc/docx.
    // Format validation is handled by multer's fileFilter below.
    public_id: (req, file) => {
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);          // e.g. '.pdf', '.docx'
      const nameWithoutExt = path.basename(file.originalname, ext);
      return `${nameWithoutExt}_${timestamp}${ext}`;        // keep extension so URL works
    },
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
  },
});

module.exports = { cloudinary, upload };
