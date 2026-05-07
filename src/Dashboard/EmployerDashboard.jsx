import React, { useEffect, useState } from 'react';
import { Briefcase, User, Bell, LogOut, Menu, X, Home, FileText, Users, Settings, Edit, Trash2, Eye, Clock, Plus, TrendingUp, MapPin, DollarSign, Building2, Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../store/Slice/UserSlice';
import Applicants from '../Components/Applicants';
import JobPosting from '../Components/JobPosting';
import { useNavigate } from "react-router-dom"
// import {fetchJobPosting} from "../store/Slice/JobSlice"
export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('applicants');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo} =  useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo.userType !== "employer"){
      console.log(userInfo.userType) ;
      navigate("/user_dashboard") 
    }
  } , [userInfo.userType])

  const [employData , setEmployData] =  useState({
    fullName : userInfo.fullName || "",
    email : userInfo.email || "",
    phone : userInfo.phone || "",
    company : userInfo.company || "",
    website : userInfo.website || "",
    about : userInfo.about || "" , 
    userId : userInfo.id || "", 
    userType : userInfo.userType || ""
  })

  function handleInputChange(e) {
    const { id, value } = e.target;
    setEmployData(prevData => ({...prevData,[id]: value }));
  }

  function handelSubmit() {
        const  regex = /^[6-9]\d{9}$/;
        if (!regex.test(employData.phone)) {
          showError("Invalid phone number. Please enter a valid 10-digit phone number.");
          return;
        }
     dispatch(updateProfile(employData))
  }

  const jobPostings = [
    { id: 1, title: 'Senior Developer', applications: 45, views: 320, status: 'active', posted: '2025-10-15', location: 'New York, NY', salary: '$120k - $150k' },
    { id: 2, title: 'UI/UX Designer', applications: 32, views: 250, status: 'active', posted: '2025-10-18', location: 'San Francisco, CA', salary: '$90k - $110k' },
    { id: 3, title: 'Product Manager', applications: 28, views: 180, status: 'closed', posted: '2025-10-10', location: 'Austin, TX', salary: '$130k - $160k' },
    { id: 4, title: 'Marketing Specialist', applications: 15, views: 95, status: 'active', posted: '2025-10-20', location: 'Remote', salary: '$70k - $90k' },
  ];

  const recentApplicants = [
    { id: 1, name: 'Alice Johnson', position: 'Senior Developer', appliedDate: '2025-10-24', status: 'pending', experience: '5 years', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', position: 'UI/UX Designer', appliedDate: '2025-10-24', status: 'shortlisted', experience: '3 years', email: 'bob@example.com' },
    { id: 3, name: 'Carol Williams', position: 'Senior Developer', appliedDate: '2025-10-23', status: 'interview', experience: '7 years', email: 'carol@example.com' },
    { id: 4, name: 'David Brown', position: 'Product Manager', appliedDate: '2025-10-23', status: 'rejected', experience: '4 years', email: 'david@example.com' },
    { id: 5, name: 'Emma Davis', position: 'Marketing Specialist', appliedDate: '2025-10-22', status: 'pending', experience: '2 years', email: 'emma@example.com' },
  ];

  const allApplicants = [
    { id: 1, name: 'Alice Johnson', position: 'Senior Developer', appliedDate: '2025-10-24', status: 'pending', experience: '5 years', email: 'alice@example.com', phone: '+1 (555) 123-4567' },
    { id: 2, name: 'Bob Smith', position: 'UI/UX Designer', appliedDate: '2025-10-24', status: 'shortlisted', experience: '3 years', email: 'bob@example.com', phone: '+1 (555) 234-5678' },
    { id: 3, name: 'Carol Williams', position: 'Senior Developer', appliedDate: '2025-10-23', status: 'interview', experience: '7 years', email: 'carol@example.com', phone: '+1 (555) 345-6789' },
    { id: 4, name: 'David Brown', position: 'Product Manager', appliedDate: '2025-10-23', status: 'rejected', experience: '4 years', email: 'david@example.com', phone: '+1 (555) 456-7890' },
    { id: 5, name: 'Emma Davis', position: 'Marketing Specialist', appliedDate: '2025-10-22', status: 'pending', experience: '2 years', email: 'emma@example.com', phone: '+1 (555) 567-8901' },
    { id: 6, name: 'Frank Miller', position: 'Senior Developer', appliedDate: '2025-10-22', status: 'shortlisted', experience: '6 years', email: 'frank@example.com', phone: '+1 (555) 678-9012' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-[#5BC3EB]/20 text-[#5BC3EB] border-[#5BC3EB]';
      case 'closed': return 'bg-[#36382E]/20 text-[#36382E] border-[#36382E]';
      case 'pending': return 'bg-[#5BC3EB]/20 text-[#5BC3EB] border-[#5BC3EB]';
      case 'shortlisted': return 'bg-[#F06449]/20 text-[#F06449] border-[#F06449]';
      case 'interview': return 'bg-purple-100 text-purple-700 border-purple-500';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-500';
      default: return 'bg-[#DADAD9] text-[#36382E] border-[#36382E]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'shortlisted': return <TrendingUp className="h-4 w-4" />;
      case 'interview': return <Users className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalApplications = jobPostings.reduce((sum, job) => sum + job.applications, 0);
  const totalViews = jobPostings.reduce((sum, job) => sum + job.views, 0);
  const activeJobs = jobPostings.filter(job => job.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 rounded-lg text-[#ed5412]"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={` lg:col-span-1 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
              <div className="text-center mb-6">
                <div className="h-24 w-24 bg-[#F06449] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Building2 className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#36382E]">{employData.fullName}</h2>
                <p className="text-[#36382E]/70">{employData.email}</p>
                <button onClick={()=>{ setActiveTab("settings") }} className="mt-4 cursor-pointer text-[#F06449] hover:text-[#36382E] font-medium text-sm flex items-center space-x-1 mx-auto">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={` cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'overview'
                    ? 'bg-[#F06449] text-white font-bold'
                    : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                    }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={` cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'jobs'
                    ? 'bg-[#F06449] text-white font-bold'
                    : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                    }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Job Postings</span>
                </button>
                <button
                  onClick={() => setActiveTab('applicants')}
                  className={` cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'applicants'
                    ? 'bg-[#F06449] text-white font-bold'
                    : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                    }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Applicants</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings'
                    ? 'bg-[#F06449] text-white font-bold'
                    : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                    }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 ">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-[#36382E]">Employer Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#5BC3EB]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-[#5BC3EB]/20 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#5BC3EB]" />
                      </div>
                      <span className="text-3xl font-bold text-[#5BC3EB]">{activeJobs}</span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Active Jobs</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#F06449]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-[#F06449]/20 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-[#F06449]" />
                      </div>
                      <span className="text-3xl font-bold text-[#F06449]">{totalApplications}</span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Total Applications</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Eye className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="text-3xl font-bold text-purple-600">{totalViews}</span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Total Views</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="text-3xl font-bold text-green-600">
                        {recentApplicants.filter(app => app.status === 'shortlisted').length}
                      </span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Shortlisted</h3>
                  </div>
                </div>

                {/* Active Job Postings */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#36382E]">Active Job Postings</h2>
                    <button className="text-[#5BC3EB] hover:text-[#F06449] font-medium text-sm">View All</button>
                  </div>
                  <div className="space-y-4">
                    {jobPostings.filter(job => job.status === 'active').map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-[#EDE6E3] rounded-lg border-2 border-[#DADAD9]">
                        <div>
                          <h3 className="font-bold text-[#36382E]">{job.title}</h3>
                          <p className="text-sm text-[#36382E]/70">{job.applications} applications • {job.views} views</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#5BC3EB]/20 text-[#5BC3EB] px-3 py-1 rounded-full text-xs font-bold">Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Applicants */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#36382E]">Recent Applicants</h2>
                    <button className="text-[#5BC3EB] hover:text-[#F06449] font-medium text-sm">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentApplicants.slice(0, 5).map((applicant) => (
                      <div key={applicant.id} className="flex items-center justify-between p-4 bg-[#EDE6E3] rounded-lg border-2 border-[#DADAD9]">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-[#5BC3EB] rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-[#36382E]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#36382E]">{applicant.name}</h3>
                            <p className="text-sm text-[#36382E]/70">{applicant.position} • {applicant.experience}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1 ${getStatusColor(applicant.status)}`}>
                          {getStatusIcon(applicant.status)}
                          <span className="capitalize">{applicant.status}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Job Postings Tab */}
            {activeTab === 'jobs' && <JobPosting/>}

            {/* Applicants Tab */}
            {activeTab === 'applicants' &&  <Applicants />}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-[#36382E]">Company Settings</h1>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <h2 className="text-xl font-bold text-[#36382E] mb-4">Company Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        placeholder="Tech Corp"
                        value={employData.company}
                        onChange={handleInputChange}
                        id="company"    
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="hr@techcorp.com"
                        value={employData.email}
                        onChange={handleInputChange}
                        id="email"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 999-0000"
                        value={employData.phone}
                        onChange={handleInputChange}
                        id="phone"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Website</label>
                      <input
                        type="url"
                        placeholder="https://www.techcorp.com"
                        value={employData.website}
                        onChange={handleInputChange}
                        id="website"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">About Company</label>
                      <textarea
                        rows="4"
                        placeholder="Leading technology company specializing in innovative solutions..."
                        value={employData.about}
                        onChange={handleInputChange}
                        id="about"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors resize-none"
                      ></textarea>
                    </div>
                    <button onClick={handelSubmit} className="bg-[#F06449] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}