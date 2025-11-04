import  React , { useState } from 'react';
import { Briefcase, User, Bell, LogOut, Menu, X, Home, FileText, Users, Settings, Edit, Trash2, Eye, Clock, Plus, TrendingUp, MapPin, DollarSign, Building2, Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Top Navigation */}
      {/* <nav className="bg-[#36382E] shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-[#F06449] p-2 rounded-lg shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#5BC3EB]">JobPortal</span>
              <span className="text-sm text-[#EDE6E3]/70 hidden sm:block">Employer</span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-[#F06449] text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Post New Job</span>
              </button>
              <button className="relative p-2 text-[#EDE6E3] hover:text-[#5BC3EB] transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-[#F06449] rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3 px-4 py-2 bg-[#36382E]/50 rounded-lg">
                <div className="h-8 w-8 bg-[#F06449] rounded-full flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-[#EDE6E3] font-medium">Tech Corp</span>
              </div>
              <button className="p-2 text-[#EDE6E3] hover:text-[#F06449] transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav> */}

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#ed5412]"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
              <div className="text-center mb-6">
                <div className="h-24 w-24 bg-[#F06449] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Building2 className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#36382E]">Tech Corp</h2>
                <p className="text-[#36382E]/70">hr@techcorp.com</p>
                <button className="mt-4 text-[#F06449] hover:text-[#36382E] font-medium text-sm flex items-center space-x-1 mx-auto">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'overview'
                      ? 'bg-[#F06449] text-white font-bold'
                      : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'jobs'
                      ? 'bg-[#F06449] text-white font-bold'
                      : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Job Postings</span>
                </button>
                <button
                  onClick={() => setActiveTab('applicants')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'applicants'
                      ? 'bg-[#F06449] text-white font-bold'
                      : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Applicants</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'settings'
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
          <div className="lg:col-span-3">
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
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-[#36382E]">Job Postings</h1>
                  <Link to="post-job">
                  <button className="bg-[#F06449] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Post New Job</span>
                  </button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {jobPostings.map((job) => (
                    <div key={job.id} className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-[#36382E]">{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(job.status)}`}>
                              {job.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-[#36382E]/60 mb-3">
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{job.salary}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Posted {job.posted}</span>
                            </span>
                          </div>
                          <div className="flex gap-6 text-sm">
                            <span className="text-[#5BC3EB] font-bold">{job.applications} Applications</span>
                            <span className="text-[#36382E]/70">{job.views} Views</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="flex items-center space-x-2 bg-[#5BC3EB] text-[#36382E] px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </button>
                          <div className="flex space-x-2">
                            <button className="flex-1 p-2 text-[#5BC3EB] hover:bg-[#5BC3EB]/10 rounded-lg transition-colors">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button className="flex-1 p-2 text-[#F06449] hover:bg-[#F06449]/10 rounded-lg transition-colors">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applicants Tab */}
            {activeTab === 'applicants' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-[#36382E]">All Applicants</h1>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-[#DADAD9] rounded-lg hover:bg-[#EDE6E3] transition-colors">
                      <Search className="h-5 w-5 text-[#36382E]" />
                      <span className="text-[#36382E] font-medium">Search</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-[#DADAD9] rounded-lg hover:bg-[#EDE6E3] transition-colors">
                      <Filter className="h-5 w-5 text-[#36382E]" />
                      <span className="text-[#36382E] font-medium">Filter</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {allApplicants.map((applicant) => (
                    <div key={applicant.id} className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="h-16 w-16 bg-[#5BC3EB] rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-8 w-8 text-[#36382E]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#36382E] mb-1">{applicant.name}</h3>
                            <p className="text-[#36382E]/70 font-medium mb-2">Applied for: {applicant.position}</p>
                            <div className="flex flex-wrap gap-3 text-sm text-[#36382E]/60">
                              <span className="flex items-center space-x-1">
                                <Briefcase className="h-4 w-4" />
                                <span>{applicant.experience} experience</span>
                              </span>
                              <span>📧 {applicant.email}</span>
                              <span>📱 {applicant.phone}</span>
                            </div>
                            <p className="text-xs text-[#36382E]/50 mt-2">Applied on {applicant.appliedDate}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-4 py-2 rounded-lg text-sm font-bold border flex items-center space-x-2 ${getStatusColor(applicant.status)}`}>
                            {getStatusIcon(applicant.status)}
                            <span className="capitalize">{applicant.status}</span>
                          </span>
                          <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-[#5BC3EB] text-[#36382E] rounded-lg font-medium hover:shadow-lg transition-all text-sm">
                              View Resume
                            </button>
                            <button className="px-4 py-2 bg-[#F06449] text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm">
                              Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                        defaultValue="Tech Corp"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="hr@techcorp.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 999-0000"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Website</label>
                      <input
                        type="url"
                        defaultValue="https://www.techcorp.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">About Company</label>
                      <textarea
                        rows="4"
                        defaultValue="Leading technology company specializing in innovative solutions..."
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors resize-none"
                      ></textarea>
                    </div>
                    <button className="bg-[#F06449] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <h2 className="text-xl font-bold text-[#36382E] mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <span className="text-[#36382E]">New application notifications</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-[#F06449]" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-[#36382E]">Weekly analytics report</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-[#F06449]" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-[#36382E]">Applicant status updates</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-[#F06449]" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-[#36382E]">Job posting expiration alerts</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-[#F06449]" />
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <h2 className="text-xl font-bold text-[#36382E] mb-4">Subscription Plan</h2>
                  <div className="bg-[#5BC3EB]/10 rounded-lg p-6 border-2 border-[#5BC3EB]/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#36382E]">Premium Plan</h3>
                        <p className="text-[#36382E]/70">Unlimited job postings</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#5BC3EB]">$99</div>
                        <div className="text-sm text-[#36382E]/70">/month</div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-[#36382E]">
                        <CheckCircle className="h-5 w-5 text-[#5BC3EB]" />
                        <span>Unlimited active job postings</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#36382E]">
                        <CheckCircle className="h-5 w-5 text-[#5BC3EB]" />
                        <span>Featured job listings</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#36382E]">
                        <CheckCircle className="h-5 w-5 text-[#5BC3EB]" />
                        <span>Advanced analytics dashboard</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#36382E]">
                        <CheckCircle className="h-5 w-5 text-[#5BC3EB]" />
                        <span>Priority customer support</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#F06449] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                      Upgrade Plan
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