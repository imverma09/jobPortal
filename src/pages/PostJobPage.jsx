import React , { useState } from 'react';
import { Briefcase, ChevronRight, ChevronLeft, Check, Building2, MapPin, DollarSign, Clock, Users, FileText, Tag, Mail, Phone, Globe } from 'lucide-react';

export default function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobCategory: '',
    jobType: '',
    experience: '',
    salary: '',
    salaryType: 'yearly',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    skills: '',
    companyName: '',
    companyWebsite: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    applicationDeadline: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Job Posted:', formData);
    alert('Job posted successfully! 🎉');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">
      <div className="bg-[#36382E] shadow-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-[#5BC3EB] p-2 rounded-lg shadow-lg">
              <Briefcase className="h-6 w-6 text-[#36382E]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#5BC3EB]">Post a New Job</h1>
              <p className="text-[#EDE6E3]/70">Fill out the form to post your job opening</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  currentStep >= step 
                    ? 'bg-[#5BC3EB] text-[#36382E] shadow-lg' 
                    : 'bg-white text-[#36382E]/50 border-2 border-[#DADAD9]'
                }`}>
                  {currentStep > step ? <Check className="h-6 w-6" /> : step}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  currentStep >= step ? 'text-[#36382E]' : 'text-[#36382E]/50'
                }`}>
                  {step === 1 && 'Job Details'}
                  {step === 2 && 'Description'}
                  {step === 3 && 'Company Info'}
                </span>
              </div>
              {step < 3 && (
                <div className={`h-1 flex-1 mx-2 rounded ${
                  currentStep > step ? 'bg-[#5BC3EB]' : 'bg-[#DADAD9]'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#36382E] mb-6 flex items-center">
                <FileText className="h-6 w-6 text-[#5BC3EB] mr-2" />
                Job Details
              </h2>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior React Developer"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#36382E] font-medium mb-2">Job Category *</label>
                  <select
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  >
                    <option value="">Select Category</option>
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="finance">Finance</option>
                    <option value="hr">Human Resources</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#36382E] font-medium mb-2">Job Type *</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  >
                    <option value="">Select Type</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#36382E] font-medium mb-2">Experience Level *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  >
                    <option value="">Select Experience</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5+ years)</option>
                    <option value="lead">Lead/Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#36382E] font-medium mb-2">Salary Range *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g. $80k - $120k"
                      className="flex-1 px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                    />
                    <select
                      name="salaryType"
                      value={formData.salaryType}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                    >
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                      <option value="hourly">Hourly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#36382E] mb-6 flex items-center">
                <FileText className="h-6 w-6 text-[#5BC3EB] mr-2" />
                Job Description
              </h2>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Job Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of the job role..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Key Responsibilities *</label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  placeholder="List the main responsibilities (one per line)..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Requirements *</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="List the job requirements and qualifications..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Benefits & Perks</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  placeholder="Health insurance, 401k, remote work, etc..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Required Skills *</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS (comma separated)"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#36382E] mb-6 flex items-center">
                <Building2 className="h-6 w-6 text-[#5BC3EB] mr-2" />
                Company & Contact Information
              </h2>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Company Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://www.example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State, Country"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#36382E] font-medium mb-2">Contact Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="hr@company.com"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#36382E] font-medium mb-2">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">Application Deadline *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#5BC3EB]/10 rounded-xl border-2 border-[#5BC3EB]/30">
                <h3 className="text-lg font-bold text-[#36382E] mb-4">Job Summary Preview</h3>
                <div className="space-y-2 text-sm text-[#36382E]">
                  <p><strong>Title:</strong> {formData.jobTitle || 'Not specified'}</p>
                  <p><strong>Company:</strong> {formData.companyName || 'Not specified'}</p>
                  <p><strong>Location:</strong> {formData.location || 'Not specified'}</p>
                  <p><strong>Type:</strong> {formData.jobType || 'Not specified'}</p>
                  <p><strong>Salary:</strong> {formData.salary || 'Not specified'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-[#DADAD9]">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-[#DADAD9] text-[#36382E]/50 cursor-not-allowed'
                  : 'bg-[#36382E] text-[#EDE6E3] hover:bg-[#36382E]/90'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center space-x-2 bg-[#5BC3EB] text-[#36382E] px-6 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                <span>Next Step</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center space-x-2 bg-[#F06449] text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                <Check className="h-5 w-5" />
                <span>Post Job</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}