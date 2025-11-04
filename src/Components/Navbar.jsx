import React ,  {useState} from 'react'
import { Menu , X, Briefcase, Search, Bell, User, ChevronDown, Home, FileText, Building2, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
     <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JobPortal
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to={"/"} className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to={"jobs"} className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <Search className="h-4 w-4" />
                <span>Find Jobs</span>
              </Link>
              <Link to={"#"} className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <Building2 className="h-4 w-4" />
                <span>Companies</span>
              </Link>
               <Link to="login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </div>
            {/* Right Side Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <Link to={"user_dashboard"} className='cursor-pointer'>
                <button 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </button>
                  </Link>

              
              </div>
                <Link  to={"post-job"}>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all">
                Post a Job
              </button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                <Search className="h-5 w-5" />
                <span>Find Jobs</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                <Building2 className="h-5 w-5" />
                <span>Companies</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                <FileText className="h-5 w-5" />
                <span>My Applications</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </a>
              <Link to={"postjob"}>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium">
                Post a Job
              </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
  )
}

export default Navbar
