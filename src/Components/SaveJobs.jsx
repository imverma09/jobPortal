import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedJob , toggleSaveJob  } from '../store/Slice/ApplicationSlice'
import { IndianRupee, Building2, Bookmark, MapPin, Clock } from 'lucide-react'
function SavedJobs() {
    const dispatch = useDispatch()
    const { savedJob } = useSelector((state) => state.application)
    useEffect(() => {
        dispatch(fetchSavedJob())
    }, [dispatch])
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#36382E]">Saved Jobs</h1>
           {
            savedJob.length === 0 && (<div className="text-center text-[#36382E]/70 py-10">
                <Clock className="mx-auto mb-4" />
                <p className="text-lg">No saved jobs yet. Start exploring and save your favorite opportunities!</p>
            </div>)
           }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedJob?.map((job) => (
                    <div key={job._id} className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-all hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                            <div className="h-12 w-12 bg-[#5BC3EB] rounded-lg flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-[#36382E]" />
                            </div>
                            <button
                            onClick={()=>{
                                dispatch(toggleSaveJob(job.jobId))
                                // window.location.reload()
                            }}
                             className="text-[#F06449] hover:bg-[#F06449]/10 p-2 rounded-lg transition-colors">
                                <Bookmark className="h-5 w-5 fill-current" />
                            </button>
                        </div>
                        <h3 className="text-xl font-bold text-[#36382E] mb-2">{job.jobId?.jobTitle}</h3>
                        <p className="text-[#36382E]/70 mb-4">{job.jobId?.companyName}</p>
                        <div className="space-y-2 text-sm text-[#36382E]/60 mb-4">
                            <p className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>{job.jobId?.location}</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <IndianRupee className="h-4 w-4" />
                                <span>{job.jobId?.salary}</span>
                            </p>
                        </div>
                        <Link to={`/JobDetailsPage/${job.jobId?._id}`}>
                        <button className="w-full bg-[#5BC3EB] text-[#36382E] py-2 rounded-lg font-bold hover:shadow-lg transition-all">
                            Apply Now
                        </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SavedJobs