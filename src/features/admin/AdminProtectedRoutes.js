import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const AdminProtectedRoutes = () => {
  const { email } = useUser();

  // Get user data from localStorage
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;

  // Check if user exists, is logged in, and has admin role
  const isAdmin = user && 
                 user.email === email && 
                 user.role === 'admin';

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminProtectedRoutes;