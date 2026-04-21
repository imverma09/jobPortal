import React from "react"
import { Trash2, Eye, Clock, MapPin, IndianRupee, Building2 } from 'lucide-react';
import { getStatusColor, getStatusIcon } from "../Helper/myApplication"

function MyApplications({ application, isLoading, isError }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#36382E]">My Applications</h1>
            <div className="space-y-4">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {isError}</p>}
                {application.length === 0 && <p>No applications found</p>}
                {application.map((app) => (
                    <div key={app._id} className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#DADAD9] hover:shadow-2xl transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start space-x-4">
                                <div className="h-16 w-16 bg-[#5BC3EB] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Building2 className="h-8 w-8 text-[#36382E]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-[#36382E] mb-1">{app?.job?.jobtitle}</h3>
                                    <p className="text-[#36382E]/70 font-medium mb-2">{app?.job?.companyName}</p>
                                    <div className="flex flex-wrap gap-3 text-sm text-[#36382E]/60">
                                        <span className="flex items-center space-x-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{app?.job?.location}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <IndianRupee className="h-4 w-4" />
                                            <span>{app?.job?.salary}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4" />
                                            <span>Applied : {app?.createdAt.split("T")[0]}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <span className={`px-4 py-2 rounded-lg text-sm font-bold border flex items-center space-x-2 ${getStatusColor(app.status)}`}>
                                    {getStatusIcon(app.status)}
                                    <span className="capitalize">{app.status}</span>
                                </span>
                                <div className="flex space-x-2">
                                    <button className="p-2 text-[#5BC3EB] hover:bg-[#5BC3EB]/10 rounded-lg transition-colors">
                                        <Eye className="h-5 w-5" />
                                    </button>
                                    <button className="p-2 text-[#F06449] hover:bg-[#F06449]/10 rounded-lg transition-colors">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyApplications