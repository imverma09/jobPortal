// --- Helper functions ---
export const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatSalary = (salary, salaryType) => {
    if (!salary) return 'Not disclosed';
    const symbol = '₹';
    const typeLabel = salaryType === 'yearly' ? '/yr' : salaryType === 'monthly' ? '/mo' : salaryType === 'hourly' ? '/hr' : '';
    return `${symbol}${Number(salary).toLocaleString()}${typeLabel}`;
};

export const formatExperience = (exp) => {
    const map = {
        entry: 'Entry Level',
        mid: 'Mid Level',
        senior: 'Senior Level',
        lead: 'Lead',
        fresher: 'Fresher',
    };
    return map[exp] || exp || 'N/A';
};

export const formatJobType = (type) => {
    const map = {
        fulltime: 'Full Time',
        parttime: 'Part Time',
        contract: 'Contract',
        internship: 'Internship',
        remote: 'Remote',
        freelance: 'Freelance',
    };
    return map[type] || type || 'N/A';
};

export const formatCategory = (cat) => {
    if (!cat) return 'N/A';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
};

export const timeAgo = (dateStr) => {
    if (!dateStr) return 'N/A';
    const now = new Date();
    const posted = new Date(dateStr);
    const diffMs = now - posted;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 month ago';
    return `${diffMonths} months ago`;
};