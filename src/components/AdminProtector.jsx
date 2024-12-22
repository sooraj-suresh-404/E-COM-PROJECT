import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const AdminProtector = ({ children }) => {
  const { email } = useUser();

  // Get user data from localStorage
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;

  // Check if user exists and has admin role
  const isAdmin = user && user.role === 'admin' && user.email === email;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtector; 