import React from 'react'
import { Search, Building2, Briefcase, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Hom() {
  let { jobs, isLoading, isError } = useSelector((state) => state.job)

  const categories = [
    { title: 'Technology', count: '1,280 jobs' },
    { title: 'Healthcare', count: '860 jobs' },
    { title: 'Finance', count: '940 jobs' },
    { title: 'Marketing', count: '720 jobs' },
    { title: 'Remote', count: '1,120 jobs' },
    { title: 'Part-time', count: '650 jobs' },
  ]

  const benefits = [
    {
      icon: Briefcase,
      title: 'Trusted Employers',
      description: 'Connect with verified companies looking to hire fast.',
    },
    {
      icon: ShieldCheck,
      title: 'Safe Applications',
      description: 'Secure profiles and private hiring with every submission.',
    },
    {
      icon: Sparkles,
      title: 'Smart Matches',
      description: 'Get the best jobs based on your skills and preferences.',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#5BC3EB]/10 px-4 py-2 text-sm font-medium text-[#36382E] mb-6">
          <Sparkles className="h-4 w-4" />
          Your next career move is just one click away.
        </div>

        <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl leading-tight mb-4">
          Discover <span className="text-[#5BC3EB]">Top Jobs</span> and Grow Your Career
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
          Search thousands of verified roles, browse trusted employers, and apply quickly with one polished profile.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-4xl font-bold text-[#5BC3EB]">10,000+</div>
          <p className="text-gray-600 mt-2">Active jobs listed</p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-4xl font-bold text-[#5BC3EB]">5,000+</div>
          <p className="text-gray-600 mt-2">Companies hiring</p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-4xl font-bold text-[#5BC3EB]">50,000+</div>
          <p className="text-gray-600 mt-2">Happy users worldwide</p>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#5BC3EB] mb-3">
              <TrendingUp className="h-4 w-4" /> Popular Categories
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore jobs by category</h2>
            <p className="text-gray-600 leading-relaxed">
              Filter your next role by industry, working style, or salary expectations. Find jobs that fit your ambition and schedule.
            </p>
          </div>
          <button className="self-start rounded-full border border-[#5BC3EB] px-6 py-3 text-sm font-semibold text-[#5BC3EB] hover:bg-[#5BC3EB]/10 transition-all">
            Browse All Categories
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
          {categories.map((category) => (
            <div key={category.title} className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <p className="text-lg font-semibold text-gray-900 mb-2">{category.title}</p>
              <p className="text-sm text-gray-500">{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 bg-[#5BC3EB]/10 rounded-[2rem] p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#5BC3EB] font-semibold uppercase text-sm tracking-[0.2em]">Why choose JobPortal</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">A better hiring experience for candidates and employers.</h2>
            <p className="text-gray-700 leading-relaxed">
              Enjoy a smooth job search, powerful filters, and fast applications with profiles presented to employers in the right way.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[#5BC3EB]/10 text-[#5BC3EB] mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <p className="text-gray-600 mt-2">Hand-picked positions from top employers ready for you to apply.</p>
          </div>
          <Link to={"jobs"}>
            <button className="rounded-full border border-[#5BC3EB] px-6 py-3 text-sm font-semibold text-[#5BC3EB] hover:bg-[#5BC3EB]/10 transition-all">
              See More Jobs
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((j, index) => (
            <div key={j._id || index} className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 bg-[#5BC3EB] rounded-2xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{j.jobType}</span>
              </div>
              <Link to={"JobDetailsPage"} className="block">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{j.jobTitle}</h3>
              </Link>
              <p className="text-gray-600 mb-4">{j.companyName}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                <span>📍 {j.location}</span>
                <span>💰 ₹ {j.salary}k</span>
              </div>
              <Link to={`/JobDetailsPage/${j._id}`}>
              <button className="w-full bg-[#5BC3EB] text-white py-3 rounded-2xl font-medium hover:bg-[#46A9DD] hover:shadow-lg transition-all">
                Apply Now
              </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hom
