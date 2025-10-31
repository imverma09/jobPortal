export let BACKEND_API = "http://localhost:5000" 

export function showError(msg) {
    const alertDiv = document.createElement('div');
      alertDiv.className = 'fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50';
      alertDiv.innerHTML = `⚠️ ${msg}`;
      document.body.appendChild(alertDiv);
      setTimeout(() => document.body.removeChild(alertDiv), 3000);
      return ;
  }
export function showSuccess(msg) {
    const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50';
        successDiv.innerHTML = `✅ ${msg}`;
        document.body.appendChild(successDiv);
        setTimeout(() => document.body.removeChild(successDiv), 3000);
        return
  }