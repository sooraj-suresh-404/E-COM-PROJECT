import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Admin Pages
import Dashboard from './pages/Dashboard';
import ManageProducts from './pages/ManageProducts';
import ManageUsers from './pages/ManageUsers';
import Reports from './pages/Reports';

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/reports" element={<Reports />} />
        </Routes>
    );
};

export default AdminRouter;
