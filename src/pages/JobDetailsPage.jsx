import React, { useState } from 'react';
import { Briefcase, ArrowLeft, MapPin, DollarSign, Clock, Users, Building2, Share2, Bookmark, CheckCircle, Calendar, TrendingUp, Mail, Phone, Globe, Award, Target } from 'lucide-react';

export default function JobDetailsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resumeFile: null
  });

  const jobDetails = {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovators Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experience: 'Senior Level (5+ years)',
    salary: '$120,000 - $150,000',
    postedDate: '2 days ago',
    applicants: 45,
    views: 320,
    description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications, working with both front-end and back-end technologies.',
    responsibilities: [
      'Design and develop scalable web applications using modern frameworks',
      'Collaborate with cross-functional teams to define and ship new features',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and mentor junior developers',
      'Optimize applications for maximum speed and scalability',
      'Troubleshoot and debug applications'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in full stack development',
      'Proficiency in React, Node.js, and MongoDB',
      'Experience with RESTful APIs and microservices architecture',
      'Strong understanding of database design and optimization',
      'Excellent problem-solving and communication skills',
      'Experience with Git and agile methodologies'
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript', 'AWS', 'Docker', 'Git'],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote work options',
      '401(k) with company match',
      'Professional development budget',
      'Generous PTO and paid holidays',
      'Team building events and company retreats'
    ],
    deadline: 'November 30, 2025'
  };

  const companyInfo = {
    website: 'https://www.techinnovators.com',
    email: 'careers@techinnovators.com',
    phone: '+1 (555) 123-4567',
    founded: '2015',
    employees: '500-1000',
    industry: 'Technology'
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitApplication = () => {
    console.log('Application submitted:', formData);
    alert('Application submitted successfully! 🎉');
    setShowApplicationModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">
      {/* Header */}

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
                    <h1 className="text-3xl font-bold text-[#36382E] mb-2">{jobDetails.title}</h1>
                    <p className="text-xl text-[#36382E]/70 font-medium mb-3">{jobDetails.company}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center space-x-1 text-[#36382E]/70">
                        <MapPin className="h-4 w-4" />
                        <span>{jobDetails.location}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-[#36382E]/70">
                        <Briefcase className="h-4 w-4" />
                        <span>{jobDetails.type}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-[#36382E]/70">
                        <TrendingUp className="h-4 w-4" />
                        <span>{jobDetails.experience}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-3 rounded-lg transition-all ${
                      isSaved 
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#5BC3EB]/10 rounded-lg p-4 border-2 border-[#5BC3EB]/20">
                  <div className="flex items-center space-x-2 text-[#5BC3EB] mb-1">
                    <DollarSign className="h-5 w-5" />
                    <span className="font-bold text-sm">Salary</span>
                  </div>
                  <p className="text-[#36382E] font-bold">{jobDetails.salary}</p>
                </div>
                <div className="bg-[#F06449]/10 rounded-lg p-4 border-2 border-[#F06449]/20">
                  <div className="flex items-center space-x-2 text-[#F06449] mb-1">
                    <Users className="h-5 w-5" />
                    <span className="font-bold text-sm">Applicants</span>
                  </div>
                  <p className="text-[#36382E] font-bold">{jobDetails.applicants} applied</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-4 border-2 border-purple-200">
                  <div className="flex items-center space-x-2 text-purple-600 mb-1">
                    <Clock className="h-5 w-5" />
                    <span className="font-bold text-sm">Posted</span>
                  </div>
                  <p className="text-[#36382E] font-bold">{jobDetails.postedDate}</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4 border-2 border-green-200">
                  <div className="flex items-center space-x-2 text-green-600 mb-1">
                    <Calendar className="h-5 w-5" />
                    <span className="font-bold text-sm">Deadline</span>
                  </div>
                  <p className="text-[#36382E] font-bold text-xs">{jobDetails.deadline}</p>
                </div>
              </div>

              <button 
                onClick={() => setShowApplicationModal(true)}
                className="w-full bg-[#F06449] text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>Apply Now</span>
                <CheckCircle className="h-6 w-6" />
              </button>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
              <h2 className="text-2xl font-bold text-[#36382E] mb-4 flex items-center">
                <Target className="h-6 w-6 text-[#5BC3EB] mr-2" />
                Job Description
              </h2>
              <p className="text-[#36382E]/80 leading-relaxed">{jobDetails.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
              <h2 className="text-2xl font-bold text-[#36382E] mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-[#5BC3EB] mr-2" />
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {jobDetails.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="h-6 w-6 bg-[#5BC3EB]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 bg-[#5BC3EB] rounded-full"></div>
                    </div>
                    <span className="text-[#36382E]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
              <h2 className="text-2xl font-bold text-[#36382E] mb-4 flex items-center">
                <Award className="h-6 w-6 text-[#F06449] mr-2" />
                Requirements
              </h2>
              <ul className="space-y-3">
                {jobDetails.requirements.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="h-6 w-6 bg-[#F06449]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-[#F06449]" />
                    </div>
                    <span className="text-[#36382E]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
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

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
              <h2 className="text-2xl font-bold text-[#36382E] mb-4">Benefits & Perks</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {jobDetails.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3 bg-[#EDE6E3] p-3 rounded-lg">
                    <div className="h-8 w-8 bg-[#5BC3EB] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-[#36382E]/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#DADAD9] sticky top-6">
              <h3 className="text-xl font-bold text-[#36382E] mb-4">Ready to Apply?</h3>
              <button 
                onClick={() => setShowApplicationModal(true)}
                className="w-full bg-[#F06449] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all mb-4"
              >
                Apply for this Job
              </button>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-2 ${
                  isSaved
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
                  <h3 className="font-bold text-[#36382E]">{jobDetails.company}</h3>
                  <p className="text-sm text-[#36382E]/70">{companyInfo.industry}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-[#36382E]/70">
                  <Globe className="h-4 w-4" />
                  <a href={companyInfo.website} className="text-[#5BC3EB] hover:underline">
                    {companyInfo.website}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-[#36382E]/70">
                  <Mail className="h-4 w-4" />
                  <span>{companyInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#36382E]/70">
                  <Phone className="h-4 w-4" />
                  <span>{companyInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#36382E]/70">
                  <Calendar className="h-4 w-4" />
                  <span>Founded: {companyInfo.founded}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#36382E]/70">
                  <Users className="h-4 w-4" />
                  <span>{companyInfo.employees} employees</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-[#5BC3EB] text-[#36382E] py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                View Company Profile
              </button>
            </div>

            {/* Job Stats */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#DADAD9]">
              <h3 className="text-lg font-bold text-[#36382E] mb-4">Job Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#36382E]/70">Total Views</span>
                  <span className="font-bold text-[#36382E]">{jobDetails.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36382E]/70">Applications</span>
                  <span className="font-bold text-[#5BC3EB]">{jobDetails.applicants}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36382E]/70">Posted</span>
                  <span className="font-bold text-[#36382E]">{jobDetails.postedDate}</span>
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
                <h2 className="text-2xl font-bold text-[#5BC3EB]">Apply for {jobDetails.title}</h2>
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
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
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
                  className="flex-1 bg-[#F06449] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}