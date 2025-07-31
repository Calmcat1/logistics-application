import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


// import DriverDashboard from './pages/driver/Dashboard';
// import AssignedDeliveries from './pages/driver/AssignedDeliveries';
// import UpdateStatus from './pages/driver/UpdateStatus';
// import Schedule from './pages/driver/Schedule';

// import CustomerDashboard from './pages/customer/Dashboard';
// import Orders from './pages/customer/Orders';
// import NewOrder from './pages/customer/NewOrder';

// import AdminDashboard from './pages/admin/Dashboard';
// import ManageDrivers from './pages/admin/ManageDrivers';
// import ManageCustomers from './pages/admin/ManageCustomers';
// import CreateOrder from './pages/admin/CreateOrder';
// import AssignDeliveries from './pages/admin/AssignDeliveries';
// import GenerateReports from './pages/admin/GenerateReports'

function App() {
  return (
    <Router>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>

          {/* Driver Routes */}
          {/* <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/driver/assigned" element={<AssignedDeliveries />} />
          <Route path="/driver/status" element={<UpdateStatus />} />
          <Route path="/driver/schedule" element={<Schedule />} /> */}

          {/* Customer Routes */}
          {/* <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/orders" element={<Orders />} />
          <Route path="/customer/new-order" element={<NewOrder />} /> */}

          {/* Admin Routes */}
          {/* <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manage-drivers" element={<ManageDrivers />} />
          <Route path="/admin/manage-customers" element={<ManageCustomers />} />
          <Route path="/admin/orders-overview" element={<OrdersOverview />} /> */}
        </Routes>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
