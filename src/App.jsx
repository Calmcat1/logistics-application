import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import DriverDashboard from './pages/driver/driverDashboard';
import DriverUpdateStatus from './pages/driver/driverUpdateStatus';

import CustomerDashboard from './pages/customer/customerDashboard';
import CustomerTrackOrders from './pages/customer/customerTrackOrders';
import CustomerNewOrder from './pages/customer/customerNewOrder';

import AdminDashboard from './pages/admin/adminDashboard';
import AdminManageUsers from './pages/admin/adminManageUsers';
import AdminCreateDelivery from './pages/admin/adminCreateDeliveries';
import AdminViewDeliveries from './pages/admin/adminViewDeliveries';
import AdminModifyOrder from './pages/admin/adminModifyOrder';

import ProtectedRoute from './components/protectedRoute';

function App() {


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Driver Routes */}
        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver-update-status"
          element={
            <ProtectedRoute>
              <DriverUpdateStatus />
            </ProtectedRoute>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-track-orders"
          element={
            <ProtectedRoute>
              <CustomerTrackOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-new-order"
          element={
            <ProtectedRoute>
              <CustomerNewOrder />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-manage-users"
          element={
            <ProtectedRoute>
              <AdminManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-create-delivery"
          element={
            <ProtectedRoute>
              <AdminCreateDelivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-view-deliveries"
          element={
            <ProtectedRoute>
              <AdminViewDeliveries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-modify-order"
          element={
            <ProtectedRoute>
              <AdminModifyOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
