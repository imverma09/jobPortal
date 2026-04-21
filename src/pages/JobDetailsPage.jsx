import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowLeft, MapPin, Eye, Clock, Users, Building2, Share2, Bookmark, CheckCircle, Calendar, TrendingUp, Mail, Phone, Globe, Award, Target, X, Loader2, CloudCog, IndianRupee } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BACKEND_API, showError, showSuccess } from '../Helper/backendApi';
import { formatDate, formatSalary, formatExperience, formatJobType, formatCategory, timeAgo } from '../Helper/jobDetails';
import { toggleSaveJob } from '../store/Slice/ApplicationSlice';
import { useDispatch } from 'react-redux';
export default function JobDetailsPage() {
  const dispatch =  useDispatch()
  const { jobId } = useParams();
  const navigate = useNavigate();
  let { userInfo } = useSelector((state) => state.auth)
  const { jobs } = useSelector((state) => state.job);
  const jobDetails = jobs.find((job) => job._id === jobId);
  console.log(jobDetails)
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });

   function handelSaveJob(){
       setIsSaved(!isSaved)
       dispatch(toggleSaveJob(jobId))
   }  

   async function getViewJob(){
      try {
        let response =  await axios.get(`${BACKEND_API}/api/view/${jobId}`, {
          withCredentials: true
        })
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching job view:", error)
      }
   }

  useEffect(() => {
    setFormData({
      fullName: userInfo.fullName,
      email: userInfo.email,
      phone: userInfo.phone,
    })
    getViewJob()
  }, [userInfo])


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmitApplication = async () => {

    if (!userInfo) {
      showError("You are not logged in as a job seeker")
      navigate("/login")
      return
    }
    if (!formData.fullName || !formData.email) {
      showError('Full name and email are required');
      return;
    }
    if (!resumeFile) {
      showError('Please upload your resume');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('jobId', jobId);
      payload.append('fullName', formData.fullName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone || '');
      payload.append('coverLetter', formData.coverLetter || '');
      payload.append('resume', resumeFile);

      const res = await axios.post(`${BACKEND_API}/api/applications/apply`, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showSuccess(res.data.message || 'Application submitted successfully! 🎉');
      setShowApplicationModal(false);
      setResumeFile(null);
    } catch (err) {
      console.log(err)
      const msg = err.response?.data?.message || 'Failed to submit application';
      showError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };



  // --- Loading / Not Found ---
  if (!jobDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-[#DADAD9] text-center max-w-md">
          <Briefcase className="h-16 w-16 text-[#DADAD9] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#36382E] mb-2">Job Not Found</h2>
          <p className="text-[#36382E]/60 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#F06449] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if deadline has passed
  const isDeadlinePassed = jobDetails.applicationDeadline
    ? new Date(jobDetails.applicationDeadline) < new Date()
    : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[#36382E]/70 hover:text-[#36382E] transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Jobs</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="h-16 w-16 bg-[#5BC3EB] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Building2 className="h-8 w-8 text-[#36382E]" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-[#36382E] mb-2">{jobDetails.jobTitle}</h1>
                    <p className="text-xl text-[#36382E]/70 font-medium mb-3">{jobDetails.companyName}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center space-x-1 text-[#36382E]/70">
                        <MapPin className="h-4 w-4" />
                        <span>{jobDetails.location || 'N/A'}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-[#36382E]/70">
                        <Briefcase className="h-4 w-4" />
                        <span>{formatJobType(jobDetails.jobType)}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-[#36382E]/70">
                        <TrendingUp className="h-4 w-4" />
                        <span>{formatExperience(jobDetails.experience)}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-[#36382E]/70">
                        <Eye className="h-4 w-4" />
                        <span>{jobDetails.views}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-[#36382E]/70">
                        <Users className="h-4 w-4" />
                        <span>{jobDetails.applied}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handelSaveJob}
                    className={`p-3 rounded-lg transition-all ${isSaved
                      ? 'bg-[#F06449] text-white'
                      : 'bg-[#EDE6E3] text-[#36382E] hover:bg-[#DADAD9]'
                      }`}
                  >
                    <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 bg-[#EDE6E3] text-[#36382E] rounded-lg hover:bg-[#DADAD9] transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Info Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#5BC3EB]/10 rounded-lg p-4 border-2 border-[#5BC3EB]/20">
                  <div className="flex items-center space-x-2 text-[#5BC3EB] mb-1">
                    <IndianRupee className="h-5 w-5" />
                    <span className="font-bold text-sm">Salary</span>
                  </div>
                  <p className="text-[#36382E] font-bold">{formatSalary(jobDetails.salary, jobDetails.salaryType)}</p>
                </div>
                <div className="bg-[#F06449]/10 rounded-lg p-4 border-2 border-[#F06449]/20">
                  <div className="flex items-center space-x-2 text-[#F06449] mb-1">
                    <Briefcase className="h-5 w-5" />
                    <span className="font-bold text-sm">Category</span>
                  </div>
                  <p className="text-[#36382E] font-bold">{formatCategory(jobDetails.jobCategory)}</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-4 border-2 border-purple-200">
                  <div className="flex items-center space-x-2 text-purple-600 mb-1">
                    <Clock className="h-5 w-5" />
                    <span className="font-bold text-sm">Posted</span>
                  </div>
                  <p className="text-[#36382E] font-bold">{timeAgo(jobDetails.createdAt)}</p>
                </div>
                <div className={`rounded-lg p-4 border-2 ${isDeadlinePassed ? 'bg-red-100 border-red-200' : 'bg-green-100 border-green-200'}`}>
                  <div className={`flex items-center space-x-2 mb-1 ${isDeadlinePassed ? 'text-red-600' : 'text-green-600'}`}>
                    <Calendar className="h-5 w-5" />
                    <span className="font-bold text-sm">{isDeadlinePassed ? 'Expired' : 'Deadline'}</span>
                  </div>
                  <p className="text-[#36382E] font-bold text-xs">{formatDate(jobDetails.applicationDeadline)}</p>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setShowApplicationModal(true)}
                disabled={isDeadlinePassed}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2 ${isDeadlinePassed
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#F06449] text-white hover:shadow-xl transform hover:scale-105'
                  }`}
              >
                <span>{isDeadlinePassed ? 'Application Closed' : 'Apply Now'}</span>
                <CheckCircle className="h-6 w-6" />
              </button>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
              <h2 className="text-2xl font-bold text-[#36382E] mb-4 flex items-center">
                <Target className="h-6 w-6 text-[#5BC3EB] mr-2" />
                Job Description
              </h2>
              <p className="text-[#36382E]/80 leading-relaxed whitespace-pre-line">{jobDetails.description || 'No description provided.'}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
              <h2 className="text-2xl font-bold text-[#36382E] mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-[#5BC3EB] mr-2" />
                Key Responsibilities
              </h2>
              <p className="text-[#36382E]/80 leading-relaxed whitespace-pre-line">{jobDetails.responsibilities || 'No responsibilities listed.'}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
              <h2 className="text-2xl font-bold text-[#36382E] mb-4 flex items-center">
                <Award className="h-6 w-6 text-[#F06449] mr-2" />
                Requirements
              </h2>
              <p className="text-[#36382E]/80 leading-relaxed whitespace-pre-line">{jobDetails.requirements || 'No requirements listed.'}</p>
            </div>

            {/* Skills */}
            {jobDetails.skills && jobDetails.skills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
                <h2 className="text-2xl font-bold text-[#36382E] mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {jobDetails.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#5BC3EB]/20 text-[#36382E] rounded-lg font-medium border-2 border-[#5BC3EB]/30 hover:bg-[#5BC3EB]/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {jobDetails.benefits && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
                <h2 className="text-2xl font-bold text-[#36382E] mb-4">Benefits & Perks</h2>
                <p className="text-[#36382E]/80 leading-relaxed whitespace-pre-line">{jobDetails.benefits}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#DADAD9] sticky top-6">
              <h3 className="text-xl font-bold text-[#36382E] mb-4">Ready to Apply?</h3>
              <button
                onClick={() => setShowApplicationModal(true)}
                disabled={isDeadlinePassed}
                className={`w-full py-3 rounded-lg font-bold transition-all mb-4 ${isDeadlinePassed
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#F06449] text-white hover:shadow-lg'
                  }`}
              >
                {isDeadlinePassed ? 'Application Closed' : 'Apply for this Job'}
              </button>
              <button
                onClick={handelSaveJob}
                className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-2 ${isSaved
                  ? 'bg-[#5BC3EB] text-[#36382E]'
                  : 'bg-[#EDE6E3] text-[#36382E] hover:bg-[#DADAD9]'
                  }`}
              >
                <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save Job'}</span>
              </button>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#DADAD9]">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-12 w-12 bg-[#5BC3EB] rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-[#36382E]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#36382E]">{jobDetails.companyName}</h3>
                  <p className="text-sm text-[#36382E]/70">{formatCategory(jobDetails.jobCategory)}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {jobDetails.companyWebsite && (
                  <div className="flex items-center space-x-2 text-[#36382E]/70">
                    <Globe className="h-4 w-4 flex-shrink-0" />
                    <a href={jobDetails.companyWebsite.startsWith('http') ? jobDetails.companyWebsite : `https://${jobDetails.companyWebsite}`} target="_blank" rel="noopener noreferrer" className="text-[#5BC3EB] hover:underline truncate">
                      {jobDetails.companyWebsite}
                    </a>
                  </div>
                )}
                {jobDetails.contactEmail && (
                  <div className="flex items-center space-x-2 text-[#36382E]/70">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <a href={`mailto:${jobDetails.contactEmail}`} className="text-[#5BC3EB] hover:underline truncate">
                      {jobDetails.contactEmail}
                    </a>
                  </div>
                )}
                {jobDetails.contactPhone && (
                  <div className="flex items-center space-x-2 text-[#36382E]/70">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <a href={`tel:${jobDetails.contactPhone}`} className="hover:text-[#5BC3EB] transition-colors">
                      {jobDetails.contactPhone}
                    </a>
                  </div>
                )}
                {jobDetails.location && (
                  <div className="flex items-center space-x-2 text-[#36382E]/70">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{jobDetails.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Job Overview */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#DADAD9]">
              <h3 className="text-lg font-bold text-[#36382E] mb-4">Job Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#36382E]/70 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Job Type</span>
                  </span>
                  <span className="font-bold text-[#36382E]">{formatJobType(jobDetails.jobType)}</span>
                </div>
                <div className="border-t border-[#EDE6E3]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36382E]/70 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Experience</span>
                  </span>
                  <span className="font-bold text-[#36382E]">{formatExperience(jobDetails.experience)}</span>
                </div>
                <div className="border-t border-[#EDE6E3]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36382E]/70 flex items-center space-x-2">
                    <IndianRupee className="h-4 w-4" />
                    <span>Salary</span>
                  </span>
                  <span className="font-bold text-[#5BC3EB]">{formatSalary(jobDetails.salary, jobDetails.salaryType)}</span>
                </div>
                <div className="border-t border-[#EDE6E3]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36382E]/70 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Posted</span>
                  </span>
                  <span className="font-bold text-[#36382E]">{timeAgo(jobDetails.createdAt)}</span>
                </div>
                <div className="border-t border-[#EDE6E3]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36382E]/70 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline</span>
                  </span>
                  <span className={`font-bold ${isDeadlinePassed ? 'text-red-500' : 'text-green-600'}`}>
                    {formatDate(jobDetails.applicationDeadline)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#DADAD9]">
            <div className="sticky top-0 bg-[#36382E] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#5BC3EB]">Apply for {jobDetails.jobTitle}</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-[#EDE6E3] hover:text-[#F06449] transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[#36382E] font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#36382E] font-medium mb-2">Upload Resume *</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
                {resumeFile && (
                  <p className="text-xs text-green-600 mt-1">✓ {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                )}
                <p className="text-xs text-[#36382E]/60 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Cover Letter *</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're a great fit for this position..."
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 bg-[#DADAD9] text-[#36382E] py-3 rounded-lg font-bold hover:bg-[#36382E] hover:text-[#EDE6E3] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F06449] text-white hover:shadow-lg'}`}
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /><span>Submitting...</span></>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}