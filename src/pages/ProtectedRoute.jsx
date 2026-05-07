// ProtectedRoute.jsx
import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from '../Components/Loader';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated} = useSelector((state) => state.auth);
    
    if( isAuthenticated === null) {
        return <Loader /> 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;