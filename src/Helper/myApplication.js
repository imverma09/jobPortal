import { Clock, TrendingUp, CheckCircle, XCircle } from "lucide-react";

export const getStatusColor = (status) => {
    switch (status) {
        case 'pending': return 'bg-[#5BC3EB]/20 text-[#5BC3EB] border-[#5BC3EB]';
        case 'interview': return 'bg-[#F06449]/20 text-[#F06449] border-[#F06449]';
        case 'accepted': return 'bg-green-100 text-green-700 border-green-500';
        case 'rejected': return 'bg-red-100 text-red-700 border-red-500';
        default: return 'bg-[#DADAD9] text-[#36382E] border-[#36382E]';
    }
};

export const getStatusIcon = (status) => {
    switch (status) {
        case 'pending': return "<Clock className='h-4 w-4' />";
        case 'interview': return "<TrendingUp className='h-4 w-4' />";
        case 'accepted': return "<CheckCircle className='h-4 w-4' />";
        case 'rejected': return "<XCircle className='h-4 w-4' />";
        default: return "<Clock className='h-4 w-4' />";
    }
};