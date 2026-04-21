// ProtectedRoute.jsx
import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    
    if( isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;