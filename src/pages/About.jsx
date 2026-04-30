import React from 'react'
import { Briefcase, Users, Target, Award, Heart, Globe } from 'lucide-react';

function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To connect talented individuals with meaningful career opportunities and help companies find the perfect fit for their teams.',
    },
    {
      icon: Users,
      title: 'Our Community',
      description: 'Building a diverse community of job seekers and employers who trust and rely on our platform for their career growth.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing the highest quality service with innovative features and reliable support.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Driven by a passion for empowering careers and creating positive impact in the professional world.',
    },
  ]

  const stats = [
    { number: '10,000+', label: 'Active Jobs' },
    { number: '5,000+', label: 'Companies' },
    { number: '50,000+', label: 'Happy Users' },
    { number: '95%', label: 'Success Rate' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#5BC3EB]/10 px-4 py-2 text-sm font-medium text-[#36382E] mb-6">
          <Globe className="h-4 w-4" />
          About JobPortal
        </div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
          Connecting <span className="text-[#5BC3EB]">Talent</span> with Opportunity
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          JobPortal is more than just a job board. We're a comprehensive platform designed to streamline the hiring process,
          empower job seekers, and help companies build exceptional teams.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-[#5BC3EB] mb-2">{stat.number}</div>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Our Story Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in 2020, JobPortal emerged from a simple idea: the job search process should be simple,
              transparent, and effective for everyone involved. We saw the frustration of outdated job boards
              and disconnected hiring processes, and we set out to change that.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Today, we're proud to serve thousands of job seekers and hundreds of companies, creating
              meaningful connections that drive career growth and business success.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-[#5BC3EB] rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Trusted by Industry Leaders</p>
                <p className="text-sm text-gray-600">From startups to Fortune 500 companies</p>
              </div>
            </div>
          </div>
          <div className="bg-[#5BC3EB]/10 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#5BC3EB] mb-2">2020</div>
                <p className="text-sm text-gray-600">Founded</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#5BC3EB] mb-2">50K+</div>
                <p className="text-sm text-gray-600">Users</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#5BC3EB] mb-2">10K+</div>
                <p className="text-sm text-gray-600">Jobs Posted</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#5BC3EB] mb-2">95%</div>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core principles guide everything we do and shape the way we serve our community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#5BC3EB]/10 text-[#5BC3EB] mb-6">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#5BC3EB]/10 rounded-[2rem] p-8 sm:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Community?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you're looking for your next opportunity or hiring top talent, JobPortal is here to help you succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#5BC3EB] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#46A9DD] transition-all">
            Start Your Journey
          </button>
          <button className="border border-[#5BC3EB] text-[#5BC3EB] px-8 py-4 rounded-2xl font-semibold hover:bg-[#5BC3EB]/10 transition-all">
            Learn More
          </button>
        </div>
      </section>
    </div>
  )
}

export default About