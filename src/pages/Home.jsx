import React from 'react'
import { Menu, X, Briefcase, Search, Bell, User, ChevronDown, Home, FileText, Building2, LogIn } from 'lucide-react';
import { useEffect, useState } from "react";
import  {BACKEND_API} from "../backendApi"
import { Link } from 'react-router-dom';
function Hom() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch(`${BACKEND_API}/api/data/getjob`) // your backend URL
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);
 
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dream Job</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Discover thousands of opportunities from top companies</p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Search className="h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>
              <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Building2 className="h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="City or state"
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all">
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10,000+</div>
            <div className="text-gray-600 mt-2">Active Jobs</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">5,000+</div>
            <div className="text-gray-600 mt-2">Companies</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50,000+</div>
            <div className="text-gray-600 mt-2">Happy Users</div>
          </div>
        </div>

        {/* Featured Jobs */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((j) => (
              <div key={j} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{j.jobType}</span>
                </div>
                <Link to={"JobDetailsPage"}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{j.jobTitle}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{j.companyName}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>📍 {j.location} </span>
                  <span>💰 ₹ {j.salary}k</span>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-shadow">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
        </div>
      
    </>
  )
}

export default Hom
