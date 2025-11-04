import React, { useState } from 'react';
import { Briefcase, Search, MapPin, DollarSign, Clock, Building2, Bookmark, Filter, X, ChevronDown, TrendingUp, Users, Bell, User, LogOut } from 'lucide-react';

export default function BrowseJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    salary: '',
    category: ''
  });

  const jobs = [
    { id: 1, title: 'Senior Full Stack Developer', company: 'Tech Innovators Inc.', location: 'San Francisco, CA', type: 'Full-time', salary: '$120k - $150k', posted: '2 days ago', applicants: 45, category: 'Technology', experience: 'Senior' },
    { id: 2, title: 'UI/UX Designer', company: 'Design Studio Pro', location: 'New York, NY', type: 'Full-time', salary: '$90k - $110k', posted: '3 days ago', applicants: 32, category: 'Design', experience: 'Mid' },
    { id: 3, title: 'Product Manager', company: 'StartUp Labs', location: 'Austin, TX', type: 'Full-time', salary: '$130k - $160k', posted: '5 days ago', applicants: 28, category: 'Management', experience: 'Senior' },
    { id: 4, title: 'Marketing Specialist', company: 'Marketing Pro', location: 'Remote', type: 'Remote', salary: '$70k - $90k', posted: '1 week ago', applicants: 15, category: 'Marketing', experience: 'Mid' },
    { id: 5, title: 'Data Scientist', company: 'AI Solutions', location: 'Seattle, WA', type: 'Full-time', salary: '$110k - $140k', posted: '4 days ago', applicants: 38, category: 'Technology', experience: 'Senior' },
    { id: 6, title: 'Frontend Developer', company: 'Web Agency', location: 'Los Angeles, CA', type: 'Contract', salary: '$80k - $100k', posted: '6 days ago', applicants: 22, category: 'Technology', experience: 'Mid' },
    { id: 7, title: 'Content Writer', company: 'Media House', location: 'Remote', type: 'Part-time', salary: '$50k - $70k', posted: '1 week ago', applicants: 18, category: 'Writing', experience: 'Entry' },
    { id: 8, title: 'DevOps Engineer', company: 'Cloud Systems', location: 'Boston, MA', type: 'Full-time', salary: '$115k - $145k', posted: '3 days ago', applicants: 41, category: 'Technology', experience: 'Senior' },
    { id: 9, title: 'Sales Manager', company: 'Sales Force Inc.', location: 'Chicago, IL', type: 'Full-time', salary: '$95k - $125k', posted: '5 days ago', applicants: 27, category: 'Sales', experience: 'Mid' },
    { id: 10, title: 'Mobile App Developer', company: 'App Creators', location: 'Miami, FL', type: 'Full-time', salary: '$105k - $135k', posted: '2 days ago', applicants: 35, category: 'Technology', experience: 'Mid' },
    { id: 11, title: 'Business Analyst', company: 'Consulting Group', location: 'Denver, CO', type: 'Full-time', salary: '$85k - $115k', posted: '4 days ago', applicants: 30, category: 'Business', experience: 'Mid' },
    { id: 12, title: 'HR Manager', company: 'People First', location: 'Remote', type: 'Remote', salary: '$80k - $100k', posted: '1 week ago', applicants: 20, category: 'HR', experience: 'Senior' },
  ];

  const categories = ['All', 'Technology', 'Design', 'Marketing', 'Sales', 'Management', 'Writing', 'Business', 'HR'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];
  const experienceLevels = ['Entry', 'Mid', 'Senior', 'Lead'];

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'jobType' || filterType === 'experience') {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      experience: [],
      salary: '',
      category: ''
    });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesJobType = filters.jobType.length === 0 || filters.jobType.includes(job.type);
    const matchesExperience = filters.experience.length === 0 || filters.experience.includes(job.experience);
    const matchesCategory = filters.category === '' || filters.category === 'All' || job.category === filters.category;
    
    return matchesSearch && matchesLocation && matchesJobType && matchesExperience && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3]">
      {/* Navbar */}
    

      {/* Hero Search Section */}
      <div className="bg-[#36382E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#5BC3EB] mb-2">Find Your Dream Job</h1>
            <p className="text-[#EDE6E3]/70 text-lg">Browse through {jobs.length}+ job opportunities</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-[#EDE6E3] rounded-lg">
                <Search className="h-5 w-5 text-[#36382E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, keywords, or company"
                  className="flex-1 bg-transparent outline-none text-[#36382E]"
                />
              </div>
              <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-[#EDE6E3] rounded-lg">
                <MapPin className="h-5 w-5 text-[#36382E]" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, state, or remote"
                  className="flex-1 bg-transparent outline-none text-[#36382E]"
                />
              </div>
              <button className="bg-[#5BC3EB] text-[#36382E] px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filters.category === category || (category === 'All' && filters.category === '')
                    ? 'bg-[#5BC3EB] text-[#36382E] shadow-lg'
                    : 'bg-white text-[#36382E] border-2 border-[#DADAD9] hover:border-[#5BC3EB]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#DADAD9] sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#36382E] flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-[#5BC3EB]" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-[#F06449] hover:text-[#36382E] text-sm font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <h3 className="font-bold text-[#36382E] mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => handleFilterChange('jobType', type)}
                        className="h-4 w-4 rounded text-[#5BC3EB]"
                      />
                      <span className="text-[#36382E]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <h3 className="font-bold text-[#36382E] mb-3">Experience Level</h3>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <label key={level} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.experience.includes(level)}
                        onChange={() => handleFilterChange('experience', level)}
                        className="h-4 w-4 rounded text-[#5BC3EB]"
                      />
                      <span className="text-[#36382E]">{level} Level</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <h3 className="font-bold text-[#36382E] mb-3">Salary Range</h3>
                <select
                  value={filters.salary}
                  onChange={(e) => handleFilterChange('salary', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB]"
                >
                  <option value="">All Ranges</option>
                  <option value="0-50k">$0 - $50k</option>
                  <option value="50k-80k">$50k - $80k</option>
                  <option value="80k-100k">$80k - $100k</option>
                  <option value="100k-150k">$100k - $150k</option>
                  <option value="150k+">$150k+</option>
                </select>
              </div>

              {/* Active Filters Count */}
              {(filters.jobType.length > 0 || filters.experience.length > 0 || filters.salary || filters.category) && (
                <div className="bg-[#5BC3EB]/10 rounded-lg p-3 border-2 border-[#5BC3EB]/30">
                  <p className="text-sm text-[#36382E] font-medium">
                    {filters.jobType.length + filters.experience.length + (filters.salary ? 1 : 0) + (filters.category && filters.category !== 'All' ? 1 : 0)} filters active
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 flex items-center justify-center space-x-2 bg-white text-[#36382E] px-6 py-3 rounded-lg font-bold border-2 border-[#DADAD9]"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#36382E]">
                  {filteredJobs.length} Jobs Found
                </h2>
                <p className="text-[#36382E]/70">Showing results for your search</p>
              </div>
              <select className="px-4 py-2 bg-white rounded-lg border-2 border-[#DADAD9] text-[#36382E] outline-none focus:border-[#5BC3EB]">
                <option>Most Recent</option>
                <option>Salary: High to Low</option>
                <option>Salary: Low to High</option>
                <option>Most Applications</option>
              </select>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="h-16 w-16 bg-[#5BC3EB] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Building2 className="h-8 w-8 text-[#36382E]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#36382E] mb-1 hover:text-[#5BC3EB] cursor-pointer">
                          {job.title}
                        </h3>
                        <p className="text-[#36382E]/70 font-medium mb-3">{job.company}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-[#36382E]/60 mb-3">
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.type}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.posted}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1 text-[#5BC3EB] font-medium">
                            <Users className="h-4 w-4" />
                            <span>{job.applicants} applicants</span>
                          </span>
                          <span className="px-3 py-1 bg-[#5BC3EB]/20 text-[#5BC3EB] rounded-full font-medium text-xs">
                            {job.category}
                          </span>
                          <span className="px-3 py-1 bg-[#F06449]/20 text-[#F06449] rounded-full font-medium text-xs">
                            {job.experience} Level
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-3 rounded-lg transition-all ${
                          savedJobs.includes(job.id)
                            ? 'bg-[#F06449] text-white'
                            : 'bg-[#EDE6E3] text-[#36382E] hover:bg-[#DADAD9]'
                        }`}
                      >
                        <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="bg-[#5BC3EB] text-[#36382E] px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all whitespace-nowrap">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredJobs.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-[#DADAD9]">
                <div className="h-20 w-20 bg-[#5BC3EB]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-[#5BC3EB]" />
                </div>
                <h3 className="text-2xl font-bold text-[#36382E] mb-2">No Jobs Found</h3>
                <p className="text-[#36382E]/70 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-[#5BC3EB] text-[#36382E] px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button className="px-4 py-2 bg-white text-[#36382E] rounded-lg font-medium border-2 border-[#DADAD9] hover:border-[#5BC3EB] transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-[#5BC3EB] text-[#36382E] rounded-lg font-bold">1</button>
                <button className="px-4 py-2 bg-white text-[#36382E] rounded-lg font-medium border-2 border-[#DADAD9] hover:border-[#5BC3EB] transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-white text-[#36382E] rounded-lg font-medium border-2 border-[#DADAD9] hover:border-[#5BC3EB] transition-colors">
                  3
                </button>
                <button className="px-4 py-2 bg-white text-[#36382E] rounded-lg font-medium border-2 border-[#DADAD9] hover:border-[#5BC3EB] transition-colors">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}