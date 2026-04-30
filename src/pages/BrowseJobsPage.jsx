import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Search, MapPin, DollarSign, Briefcase, Building2, Clock, Bookmark, Filter, X, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleSaveJob } from '../store/Slice/ApplicationSlice'
function BrowseJobsPage() {
  const dispatch =  useDispatch()
  const { jobs, isLoading, isError } = useSelector((state) => state.job)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [savedJobs, setSavedJobs] = useState([])
  const [selectedType, setSelectedType] = useState('')
  // const [selectedSalary, setSelectedSalary] = useState('')
   console.log(jobs);
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship']

  const toggleSaveJob1 = (jobId) => {
       dispatch(toggleSaveJob(jobId))
      setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchQuery === '' ||
      job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation =
      locationQuery === '' ||
      job.location?.toLowerCase().includes(locationQuery.toLowerCase())
    const matchesType =
      selectedType === '' ||
      job.jobType?.toLowerCase() === selectedType.toLowerCase()
    return matchesSearch && matchesLocation && matchesType
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[#DADAD9] border-t-[#5BC3EB] animate-spin"></div>
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-b-[#F06449] animate-spin animate-[spin_1.5s_linear_infinite]"></div>
        </div>
        <p className="mt-6 text-lg font-semibold text-[#36382E] animate-pulse">Loading Jobs...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md border-2 border-[#F06449]/30">
          <div className="h-20 w-20 bg-[#F06449]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="h-10 w-10 text-[#F06449]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#36382E] mb-2">Something Went Wrong</h3>
          <p className="text-[#36382E]/60 mb-6">We couldn't load the jobs. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#F06449] text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:scale-105 transform transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">

      {/* Hero Search Section */}
      <div className="bg-[#36382E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#5BC3EB] mb-2">Browse All Jobs</h1>
            <p className="text-[#EDE6E3]/70 text-lg">
              Explore <span className="text-[#5BC3EB] font-semibold">{jobs.length}</span> opportunities waiting for you
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-[#EDE6E3] rounded-lg">
                <Search className="h-5 w-5 text-[#36382E]/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, keywords, or company"
                  className="flex-1 bg-transparent outline-none text-[#36382E] placeholder-[#36382E]/40"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}>
                    <X className="h-4 w-4 text-[#36382E]/40 hover:text-[#F06449] transition-colors" />
                  </button>
                )}
              </div>
              <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-[#EDE6E3] rounded-lg">
                <MapPin className="h-5 w-5 text-[#36382E]/50" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City, state, or remote"
                  className="flex-1 bg-transparent outline-none text-[#36382E] placeholder-[#36382E]/40"
                />
                {locationQuery && (
                  <button onClick={() => setLocationQuery('')}>
                    <X className="h-4 w-4 text-[#36382E]/40 hover:text-[#F06449] transition-colors" />
                  </button>
                )}
              </div>
              <button className="bg-[#5BC3EB] text-[#36382E] px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:brightness-110 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Type Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedType('')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${selectedType === ''
              ? 'bg-[#5BC3EB] text-[#36382E] shadow-lg shadow-[#5BC3EB]/30'
              : 'bg-white text-[#36382E] border-2 border-[#DADAD9] hover:border-[#5BC3EB]'
              }`}
          >
            All Jobs
          </button>
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? '' : type)}
              className={`px-5 py-2 rounded-lg font-medium transition-all ${selectedType === type
                ? 'bg-[#5BC3EB] text-[#36382E] shadow-lg shadow-[#5BC3EB]/30'
                : 'bg-white text-[#36382E] border-2 border-[#DADAD9] hover:border-[#5BC3EB]'
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#36382E]">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
            <p className="text-[#36382E]/60 text-sm mt-1">
              {searchQuery || locationQuery || selectedType
                ? 'Showing filtered results'
                : 'Showing all available positions'}
            </p>
          </div>
          {(searchQuery || locationQuery || selectedType) && (
            <button
              onClick={() => {
                setSearchQuery('')
                setLocationQuery('')
                setSelectedType('')
              }}
              className="flex items-center space-x-2 text-[#F06449] hover:text-[#36382E] font-medium text-sm transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <div
                key={job._id || index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-[#DADAD9] hover:border-[#5BC3EB]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#36382E] to-[#36382E]/90 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-[#5BC3EB]/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Building2 className="h-6 w-6 text-[#5BC3EB]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm truncate max-w-[180px]">{job.companyName}</p>
                      <span className="text-[#5BC3EB] text-xs font-medium">{job.jobType}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveJob1(job._id)}
                    className={`p-2 rounded-lg transition-all ${savedJobs.includes(job._id || index)
                      ? 'bg-[#F06449] text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                      }`}
                  >
                    <Bookmark className={`h-4 w-4 ${savedJobs.includes(job._id || index) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="px-6 py-5">
                  <Link to="JobDetailsPage">
                    <h3 className="text-xl font-bold text-[#36382E] mb-3 group-hover:text-[#5BC3EB] transition-colors line-clamp-2 cursor-pointer">
                      {job.jobTitle}
                    </h3>
                  </Link>

                  <p className="text-[#36382E]/60 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {job.jobDescription}
                  </p>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center space-x-2 text-sm text-[#36382E]/70">
                      <MapPin className="h-4 w-4 text-[#5BC3EB] flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-[#36382E]/70">
                      <DollarSign className="h-4 w-4 text-[#5BC3EB] flex-shrink-0" />
                      <span>₹ {job.salary}k / year</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-[#36382E]/70">
                      <Briefcase className="h-4 w-4 text-[#5BC3EB] flex-shrink-0" />
                      <span>{job.jobType}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-5">
                  <Link to={`/JobDetailsPage/${job._id}`}>
                    <button className="w-full bg-[#5BC3EB] text-[#36382E] py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#5BC3EB]/30 transform hover:scale-[1.02] transition-all">
                      View Details & Apply
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No Results
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-[#DADAD9]">
            <div className="h-20 w-20 bg-[#5BC3EB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-[#5BC3EB]" />
            </div>
            <h3 className="text-2xl font-bold text-[#36382E] mb-2">No Jobs Found</h3>
            <p className="text-[#36382E]/60 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setLocationQuery('')
                setSelectedType('')
              }}
              className="bg-[#5BC3EB] text-[#36382E] px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseJobsPage