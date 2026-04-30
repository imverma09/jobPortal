import React from "react";
import { Link } from "react-router-dom";
import { IndianRupee, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Eye, Edit, Trash2, MapPin, Clock } from "lucide-react";
import { fetchJobPosting , deleteJob } from "../store/Slice/JobSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStatusColor } from "../Helper/myApplication";

function JobPosting() {
  let dispatch = useDispatch();
  const { jobPostings } = useSelector((state) => state.job);
  
  useEffect(() => {
    dispatch(fetchJobPosting());
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#36382E]">Job Postings</h1>
        <Link to="/post-job">
          <button className="bg-[#F06449] cursor-pointer text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Post New Job</span>
          </button>
        </Link>
      </div>
      <div className="space-y-4">
        {jobPostings.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-[#36382E]">
                    {job.jobTitle}
                  </h3>
                  {/* <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(job.status)}`}>
                                 {job.status.toUpperCase()}
                               </span> */}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-[#36382E]/60 mb-3">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <IndianRupee className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {job.posted}</span>
                  </span>
                </div>
                <div className="flex gap-6 text-sm">
                  <span className="text-[#5BC3EB] font-bold">
                    {job.applied} Applications
                  </span>
                  <span className="text-[#36382E]/70">{job.views} Views</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Link to={`/JobDetailsPage/${job._id}`}>
                <button className="flex items-center space-x-2 bg-[#5BC3EB] text-[#36382E] px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                </Link>
                <div className="flex space-x-2">
                  <button className="flex-1 p-2 text-[#5BC3EB] hover:bg-[#5BC3EB]/10 rounded-lg transition-colors">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button  onClick={()=>{  
                      let isConfirm = window.confirm("Are you sure !")
                      if(isConfirm) dispatch( deleteJob(job._id))
                     }} className="flex-1 p-2 text-[#F06449] hover:bg-[#F06449]/10 rounded-lg transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobPosting;
