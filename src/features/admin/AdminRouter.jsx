import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminProtector from '../../components/AdminProtector';
import AdminNavbar from '../../components/AdminNavbar';
import Dashboard from './pages/Dashboard';
import ManageOrders from './pages/ManageOders';
import ManageProducts from './pages/ManageProducts';
import ManageUser from './pages/ManageUser';
import Report from './pages/Report';

const AdminRouter = () => {
    return (
        <AdminProtector>
            <div className="flex">
                {/* Admin Sidebar Navigation */}
                <div className="w-64 min-h-screen bg-gray-800">
                    <AdminNavbar />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-gray-100">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/manage-orders" element={<ManageOrders />} />
                        <Route path="/manage-products" element={<ManageProducts />} />
                        <Route path="/manage-users" element={<ManageUser />} />
                        <Route path="/reports" element={<Report />} />
                    </Routes>
                </div>
            </div>
        </AdminProtector>
    );
};

export default AdminRouter;