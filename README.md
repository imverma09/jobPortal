# Job Portal

A full-stack job portal application that connects job seekers with employers. The platform allows users to browse and apply for jobs, while employers can post job listings and manage applications.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Key Components](#key-components)

## ✨ Features

### For Job Seekers
- **Browse Jobs**: Search and filter through available job listings
- **Job Applications**: Apply for jobs directly through the platform
- **Save Jobs**: Bookmark jobs for later review
- **Application Tracking**: View status of submitted applications
- **User Dashboard**: Manage profile and applications
- **Job Details**: View comprehensive job information

### For Employers
- **Post Jobs**: Create and publish new job listings
- **Manage Applications**: Review and track applicant submissions
- **Employer Dashboard**: Monitor job postings and applicant metrics
- **Job View Analytics**: Track how many times jobs are viewed

### General
- **User Authentication**: Secure signup/login with JWT tokens
- **OTP Verification**: Email-based OTP for account security
- **Password Recovery**: Forgot password functionality
- **Email Notifications**: SendGrid integration for notifications
- **Image Uploads**: Cloudinary integration for profile images

## 🛠 Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router** 7.9.4 - Client-side routing
- **Tailwind CSS** 4.1.14 - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** 5.1.0 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.19.2 - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Cloud image storage
- **SendGrid** - Email service
- **OTP Generator** - Two-factor authentication
- **Multer** - File upload handling
- **Express Rate Limit** - API rate limiting

## 📁 Project Structure

```
jobPortal/
├── src/                           # Frontend source code
│   ├── Components/                # Reusable React components
│   │   ├── Applicants.jsx
│   │   ├── Footer.jsx
│   │   ├── JobPosting.jsx
│   │   ├── MyApplications.jsx
│   │   ├── Navbar.jsx
│   │   └── SaveJobs.jsx
│   ├── Dashboard/                 # Dashboard pages
│   │   ├── EmployerDashboard.jsx
│   │   └── UserDashboard.jsx
│   ├── pages/                     # Page components
│   │   ├── Home.jsx
│   │   ├── BrowseJobsPage.jsx
│   │   ├── JobDetailsPage.jsx
│   │   ├── PostJobPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── SignInPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Layout.jsx
│   ├── Helper/                    # Utility functions
│   │   ├── backendApi.js          # API calls
│   │   ├── jobDetails.js
│   │   ├── myApplication.js
│   │   └── utils/
│   │       └── debounce.js
│   ├── store/                     # Redux store
│   │   └── Slice/
│   │       ├── UserSlice.jsx
│   │       ├── JobSlice.jsx
│   │       ├── ApplicationSlice.jsx
│   │       └── Applicants.jsx
│   ├── App.jsx                    # Root component
│   └── main.jsx                   # Entry point
│
├── backend/                       # Backend source code
│   ├── model/                     # Database schemas
│   │   ├── userModel.js
│   │   ├── job.js
│   │   ├── application.js
│   │   ├── saveJob.js
│   │   ├── jobView.js
│   │   ├── employer.js
│   │   └── Otp.js
│   ├── router/                    # API routes
│   │   ├── userRoutes.js
│   │   ├── jobs.js
│   │   ├── applications.js
│   │   ├── saveJob.js
│   │   ├── jobView.js
│   │   └── Otp.js
│   ├── middleware/                # Custom middleware
│   │   └── authMiddleware.js
│   ├── config/                    # Configuration files
│   │   ├── cloudinary.js
│   │   └── sendGrid.js
│   ├── server.js                  # Express server entry point
│   └── package.json
│
├── public/                        # Static assets
├── package.json                   # Frontend dependencies
├── vite.config.js                 # Vite configuration
└── index.html                     # HTML entry point
```

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or MongoDB Atlas account)
- **Git**

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd jobPortal
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

## 🔐 Environment Setup

### Frontend Environment (`.env` in root)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend Environment (`.env` in backend folder)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_EMAIL=your_sendgrid_email
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Frontend (from root directory)**
```bash
npm start
```
Frontend will run on `http://localhost:5173`

**Terminal 2 - Backend (from backend directory)**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

### Production Build

**Frontend**
```bash
npm run build
npm run preview
```

**Backend**
```bash
cd backend
npm start
```

## 🔌 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/send-otp` - Send OTP to email
- `POST /api/user/verify-otp` - Verify OTP

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/forgot-password` - Request password reset

### Jobs
- `GET /api/data/jobs` - Get all jobs
- `GET /api/data/jobs/:id` - Get job details
- `POST /api/data/jobs` - Create new job (Employer only)
- `PUT /api/data/jobs/:id` - Update job (Employer only)
- `DELETE /api/data/jobs/:id` - Delete job (Employer only)

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications/:userId` - Get user applications
- `GET /api/applications/employer/:employerId` - Get employer applications
- `PUT /api/applications/:id` - Update application status

### Saved Jobs
- `POST /api/saveJob` - Save a job
- `GET /api/saveJob/:userId` - Get saved jobs
- `DELETE /api/saveJob/:jobId` - Remove saved job

### Job Views
- `POST /api/view` - Record job view
- `GET /api/view/job/:jobId` - Get job view count

## 🎯 Key Components

### Frontend Components

**Navbar** - Navigation menu with authentication links
**JobPosting** - Component for creating/editing job listings
**Applicants** - Display applicant information
**MyApplications** - Show user's submitted applications
**SaveJobs** - Display user's saved jobs
**UserDashboard** - Dashboard for job seekers
**EmployerDashboard** - Dashboard for employers

### Backend Models

**User** - Job seeker profile
**Employer** - Employer profile
**Job** - Job listing
**Application** - Job application
**SaveJob** - Saved job bookmark
**JobView** - Job view analytics
**OTP** - One-time password records

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- OTP verification for account security
- Rate limiting on API endpoints
- CORS protection
- Protected routes for authenticated users

## 📝 License

This project is licensed under the ISC License.

## 👥 Support

For issues or questions, please open an issue in the repository.

