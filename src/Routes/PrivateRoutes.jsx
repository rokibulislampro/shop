import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../pages/Shared/LoadingSpinner/LoadingSpinner'; 

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/Login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
