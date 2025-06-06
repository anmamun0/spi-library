import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteAdmin = ({ children }) => {
    
    const token = localStorage.getItem('token_id');
    const isAdmin = localStorage.getItem('isAdmin');
    
    return (token && isAdmin) ? children : <Navigate to="/" />;
     
};

export default PrivateRouteAdmin;