
// AdminRouter Component
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/Dashboard';
import ManageProducts from './pages/ManageProducts';
import ManageUsers from './pages/ManageUsers';
import Reports from './pages/Reports';
import AdminNavbar from '../../components/AdminNavbar';
import ManageOrders from './pages/ManageOders';

const AdminRouter = () => {
    return (
        <div className="admin-layout">
            <AdminNavbar />
            <div className="admin-content">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="manage-products" element={<ManageProducts />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-orders" element={<ManageOrders/>} />
                    <Route path="reports" element={<Reports />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminRouter;