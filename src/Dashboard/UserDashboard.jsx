import React , { useState } from 'react';
import { Briefcase, User, Bell, LogOut, Menu, X, Home, FileText, Bookmark, Settings, Edit, Trash2, Eye, Clock, CheckCircle, XCircle, TrendingUp, MapPin, DollarSign, Building2 } from 'lucide-react';
import { useSelector } from 'react-redux';
export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {userInfo} = useSelector((state)=> state.auth)
  
  const applications = [
    { id: 1, company: 'Tech Corp', position: 'Senior Developer', status: 'pending', appliedDate: '2025-10-20', salary: '$120k - $150k', location: 'New York, NY' },
    { id: 2, company: 'Design Studio', position: 'UI/UX Designer', status: 'interview', appliedDate: '2025-10-18', salary: '$90k - $110k', location: 'San Francisco, CA' },
    { id: 3, company: 'Marketing Inc', position: 'Content Writer', status: 'rejected', appliedDate: '2025-10-15', salary: '$60k - $80k', location: 'Remote' },
    { id: 4, company: 'StartUp Labs', position: 'Product Manager', status: 'accepted', appliedDate: '2025-10-12', salary: '$130k - $160k', location: 'Austin, TX' },
  ];

  const savedJobs = [
    { id: 1, company: 'Google', position: 'Software Engineer', salary: '$150k - $200k', location: 'Mountain View, CA', posted: '2 days ago' },
    { id: 2, company: 'Microsoft', position: 'Cloud Architect', salary: '$140k - $180k', location: 'Seattle, WA', posted: '5 days ago' },
    { id: 3, company: 'Amazon', position: 'DevOps Engineer', salary: '$130k - $170k', location: 'Seattle, WA', posted: '1 week ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-[#5BC3EB]/20 text-[#5BC3EB] border-[#5BC3EB]';
      case 'interview': return 'bg-[#F06449]/20 text-[#F06449] border-[#F06449]';
      case 'accepted': return 'bg-green-100 text-green-700 border-green-500';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-500';
      default: return 'bg-[#DADAD9] text-[#36382E] border-[#36382E]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'interview': return <TrendingUp className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">
      {/* Top Navigation */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#e04908]"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
              <div className="text-center mb-6">
                <div className="h-24 w-24 bg-[#5BC3EB] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="h-12 w-12 text-[#36382E]" />
                </div>
                <h2 className="text-xl font-bold text-[#36382E]">{userInfo?.fullName || "user"}</h2>
                <p className="text-[#36382E]/70">{userInfo?.email || "user@gmail.com"}</p>
                <button className="mt-4 text-[#5BC3EB] hover:text-[#36382E] font-medium text-sm flex items-center space-x-1 mx-auto">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'overview'
                      ? 'bg-[#5BC3EB] text-[#36382E] font-bold'
                      : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'applications'
                      ? 'bg-[#5BC3EB] text-[#36382E] font-bold'
                      : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>My Applications</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'saved'
                      ? 'bg-[#5BC3EB] text-[#36382E] font-bold'
                      : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                  }`}
                >
                  <Bookmark className="h-5 w-5" />
                  <span>Saved Jobs</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'settings'
                      ? 'bg-[#5BC3EB] text-[#36382E] font-bold'
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
                <h1 className="text-3xl font-bold text-[#36382E]">Dashboard Overview</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#5BC3EB]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-[#5BC3EB]/20 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#5BC3EB]" />
                      </div>
                      <span className="text-3xl font-bold text-[#5BC3EB]">{applications.length}</span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Total Applications</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#F06449]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-[#F06449]/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-[#F06449]" />
                      </div>
                      <span className="text-3xl font-bold text-[#F06449]">
                        {applications.filter(app => app.status === 'interview').length}
                      </span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Interviews</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="text-3xl font-bold text-green-600">
                        {applications.filter(app => app.status === 'accepted').length}
                      </span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Offers Received</h3>
                  </div>
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <h2 className="text-xl font-bold text-[#36382E] mb-4">Recent Applications</h2>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-[#EDE6E3] rounded-lg border-2 border-[#DADAD9]">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-[#5BC3EB] rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-[#36382E]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#36382E]">{app.position}</h3>
                            <p className="text-sm text-[#36382E]/70">{app.company}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-[#36382E]">My Applications</h1>

                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="h-16 w-16 bg-[#5BC3EB] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-8 w-8 text-[#36382E]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#36382E] mb-1">{app.position}</h3>
                            <p className="text-[#36382E]/70 font-medium mb-2">{app.company}</p>
                            <div className="flex flex-wrap gap-3 text-sm text-[#36382E]/60">
                              <span className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{app.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{app.salary}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>Applied {app.appliedDate}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-4 py-2 rounded-lg text-sm font-bold border flex items-center space-x-2 ${getStatusColor(app.status)}`}>
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </span>
                          <div className="flex space-x-2">
                            <button className="p-2 text-[#5BC3EB] hover:bg-[#5BC3EB]/10 rounded-lg transition-colors">
                              <Eye className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-[#F06449] hover:bg-[#F06449]/10 rounded-lg transition-colors">
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

            {/* Saved Jobs Tab */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-[#36382E]">Saved Jobs</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-all hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-12 w-12 bg-[#5BC3EB] rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-[#36382E]" />
                        </div>
                        <button className="text-[#F06449] hover:bg-[#F06449]/10 p-2 rounded-lg transition-colors">
                          <Bookmark className="h-5 w-5 fill-current" />
                        </button>
                      </div>
                      <h3 className="text-xl font-bold text-[#36382E] mb-2">{job.position}</h3>
                      <p className="text-[#36382E]/70 mb-4">{job.company}</p>
                      <div className="space-y-2 text-sm text-[#36382E]/60 mb-4">
                        <p className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Posted {job.posted}</span>
                        </p>
                      </div>
                      <button className="w-full bg-[#5BC3EB] text-[#36382E] py-2 rounded-lg font-bold hover:shadow-lg transition-all">
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-[#36382E]">Settings</h1>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <h2 className="text-xl font-bold text-[#36382E] mb-4">Profile Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <button className="bg-[#5BC3EB] text-[#36382E] px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <h2 className="text-xl font-bold text-[#36382E] mb-4">Notifications</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <span className="text-[#36382E]">Email notifications</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-[#5BC3EB]" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-[#36382E]">Job alerts</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-[#5BC3EB]" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-[#36382E]">Application updates</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-[#5BC3EB]" />
                    </label>
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