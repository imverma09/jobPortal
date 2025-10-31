import React from 'react'
import { Briefcase } from 'lucide-react';

function Footer() {
  return (
   <footer className="bg-[#36382E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-[#5BC3EB] p-2 rounded-lg shadow-lg">
                  <Briefcase className="h-6 w-6 text-[#36382E]" />
                </div>
                <span className="text-2xl font-bold text-[#5BC3EB]">JobPortal</span>
              </div>
              <p className="text-[#EDE6E3]/70 mb-4">
                Your trusted partner in finding the perfect career opportunity. Connect with top employers and take the next step in your professional journey.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-[#5BC3EB] rounded-full flex items-center justify-center hover:bg-[#5BC3EB]/80 transition-colors">
                  <span className="text-[#36382E] font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-[#5BC3EB] rounded-full flex items-center justify-center hover:bg-[#5BC3EB]/80 transition-colors">
                  <span className="text-[#36382E] font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-[#5BC3EB] rounded-full flex items-center justify-center hover:bg-[#5BC3EB]/80 transition-colors">
                  <span className="text-[#36382E] font-bold">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-[#5BC3EB] rounded-full flex items-center justify-center hover:bg-[#5BC3EB]/80 transition-colors">
                  <span className="text-[#36382E] font-bold">ig</span>
                </a>
              </div>
            </div>

            {/* For Job Seekers */}
            <div>
              <h3 className="text-[#5BC3EB] font-bold text-lg mb-4">For Job Seekers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Browse Categories</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Job Alerts</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">My Account</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Career Advice</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Resume Builder</a></li>
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-[#F06449] font-bold text-lg mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#F06449] transition-colors">Post a Job</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#F06449] transition-colors">Browse Candidates</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#F06449] transition-colors">Employer Dashboard</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#F06449] transition-colors">Pricing Plans</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#F06449] transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#F06449] transition-colors">Resources</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[#5BC3EB] font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">About Us</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">FAQ</a></li>
                <li><a href="#" className="text-[#EDE6E3]/70 hover:text-[#5BC3EB] transition-colors">Sitemap</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 pt-8 border-t border-[#5BC3EB]/20">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-[#5BC3EB] font-bold text-lg mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-[#EDE6E3]/70 mb-4">Get the latest job openings and career tips delivered to your inbox</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
                <button className="bg-[#F06449] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#F06449]/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-[#5BC3EB]/20 text-center">
            <p className="text-[#EDE6E3]/70">
              © 2025 JobPortal. All rights reserved. Made with ❤️ for job seekers worldwide.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
