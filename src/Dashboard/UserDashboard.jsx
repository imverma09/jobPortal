import React, { useState, useEffect } from 'react';
import { Briefcase, User, Bell, LogOut, Menu, X, Home, FileText, Bookmark, Settings, Edit, Trash2, Eye, Clock, CheckCircle, XCircle, TrendingUp, MapPin, DollarSign, Building2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchApplication } from '../store/Slice/ApplicationSlice';
import MyApplications from '../Components/MyApplications';
import { getStatusColor, getStatusIcon } from '../Helper/myApplication';
import { updateProfile } from '../store/Slice/UserSlice'
import SavedJobs from '../Components/SaveJobs';
import { showError } from '../Helper/backendApi';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth)
  const [profile, setProfile] = useState({
    fullName: userInfo.fullName,
    email: userInfo.email,
    phone: userInfo.phone,
  })
  const dispatch = useDispatch()
  
  function handelChange(e) {
    let { id, value } = e.target
    setProfile((prev) => ({ ...prev, [id]: value }))
  }

  const handleUpdateProfile = () => {
    if (!profile.fullName.trim()) {
      showError("Full name is required.");
      return;
    }
    if (profile.phone.length !== 10) {
      showError("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    dispatch(updateProfile(profile))
  }

  useEffect(() => {
    dispatch(fetchApplication())
  }, [])

  const { application, isLoading, isError } = useSelector((state) => state.application)


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
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'overview'
                    ? 'bg-[#5BC3EB] text-[#36382E] font-bold'
                    : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                    }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'applications'
                    ? 'bg-[#5BC3EB] text-[#36382E] font-bold'
                    : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                    }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>My Applications</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'saved'
                    ? 'bg-[#5BC3EB] text-[#36382E] font-bold'
                    : 'text-[#36382E]/70 hover:bg-[#EDE6E3]'
                    }`}
                >
                  <Bookmark className="h-5 w-5" />
                  <span>Saved Jobs</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings'
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
                      <span className="text-3xl font-bold text-[#5BC3EB]">{application.length}</span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Total Applications</h3>
                  </div>

                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#F06449]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-[#F06449]/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-[#F06449]" />
                      </div>
                      <span className="text-3xl font-bold text-[#F06449]">
                        {application.filter(app => app.status === 'interview').length}
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
                        {application.filter(app => app.status === 'accepted').length}
                      </span>
                    </div>
                    <h3 className="text-[#36382E] font-medium">Offers Received</h3>
                  </div>
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9]">
                  <h2 className="text-xl font-bold text-[#36382E] mb-4">Recent Applications</h2>
                  <div className="space-y-4">
                    {application.slice(0, 3).map((app) => (
                      <div key={app._id} className="flex items-center justify-between p-4 bg-[#EDE6E3] rounded-lg border-2 border-[#DADAD9]">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-[#5BC3EB] rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-[#36382E]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#36382E]">{app?.job?.jobTitle}</h3>
                            <p className="text-sm text-[#36382E]/70">{app?.job?.companyName}</p>
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
            {activeTab === 'applications' && <MyApplications application={application} isLoading={isLoading} isError={isError} />}

            {/* Saved Jobs Tab */}
            {activeTab === 'saved' && <SavedJobs />}

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
                        defaultValue={profile?.fullName || "user"}
                        value={profile?.fullName}
                        id="fullName"
                        onChange={handelChange}
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={profile?.email || "user@example.com"}
                        value={profile?.email}
                        id="email"
                        disabled={true}
                        onChange={handelChange}
                        className="w-full px-4 cursor-not-allowed py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#36382E] font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        // defaultValue="+91 96123-457"
                        value={profile?.phone}
                        id="phone"
                        onChange={handelChange}
                        className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                      />
                    </div>
                    <button onClick={handleUpdateProfile} className="bg-[#5BC3EB] text-[#36382E] px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
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