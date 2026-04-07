const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
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
    allowed_formats: ['pdf', 'doc', 'docx'],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const nameWithoutExt = file.originalname.replace(/\.[^/.]+$/, '');
      return `${nameWithoutExt}_${timestamp}`;
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
