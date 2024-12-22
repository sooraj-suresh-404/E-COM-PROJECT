import { Routes, Route } from 'react-router-dom';
import AdminProtector from '../components/AdminProtector';

// Import your admin components here
import AdminDashboard from '../features/admin/pages/AdminDashboard';
import ProductManagement from '../features/admin/pages/ProductManagement';
import OrderManagement from '../features/admin/pages/OrderManagement';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <AdminProtector>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/orders" element={<OrderManagement />} />
            </Routes>
          </AdminProtector>
        }
      />
    </Routes>
  );
};

export default AdminRoutes; 