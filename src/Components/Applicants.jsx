import React, { useEffect } from 'react';
import { Search, Filter, User, Briefcase, Link } from 'lucide-react';
import { getApplicants , updateApplicationStatus } from '../store/Slice/Applicants';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getStatusColor, getStatusIcon } from '../Helper/myApplication';
// import { Link as routerLink  } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
function Applicants() {
    const dispatch =  useDispatch()
    const { applicants , isLoading  , isError } = useSelector((state)=> state.applicants)
   
    useEffect(()=>{
         dispatch(getApplicants())
    } , [])

    return (
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
                  {applicants.map((applicant) => (
                    <div key={applicant._id} className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="h-16 w-16 bg-[#5BC3EB] rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-8 w-8 text-[#36382E]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#36382E] mb-1">{applicant.fullName}</h3>
                            <p className="text-[#36382E]/70 font-medium mb-2">Applied for: {applicant.job.jobTitle}</p>
                            <div className="flex flex-wrap gap-3 text-sm text-[#36382E]/60">
                              <span>📧 {applicant.email}</span>
                              <span>📱 {applicant.phone}</span>
                            </div>
                            <p className="text-xs text-[#36382E]/50 mt-2">Applied on {new Date(applicant.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-4 py-2 rounded-lg text-sm font-bold border flex items-center space-x-2 ${getStatusColor(applicant.status)}`}>
                            {getStatusIcon(applicant.status)}
                            <span className="capitalize">{applicant.status} </span>
                          </span>
                          <div className="flex space-x-2">
                            <select  value={applicant.status} className='px-4 py-2 bg-[#5BC3EB] text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm'  onChange={(e) =>
                                dispatch(updateApplicationStatus({ applicantId: applicant._id, status: e.target.value }))
                               }>
                              <option value="">Change Status</option>
                              <option value="pending">Pending</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="interview">Interview</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <RouterLink to={applicant.resumeUrl} target="_blank">
                            <button className="px-4 py-2 bg-[#5BC3EB] text-[#36382E] rounded-lg font-medium hover:shadow-lg transition-all text-sm">
                              View Resume 
                            </button>
                            </RouterLink>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    );
}

export default Applicants;