import React, { useEffect, useState } from 'react';
import '../admin/adminStyles/admin.css';

const AdminDashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {

   
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUserName(userData.name);
    }

    console.log(userData.name);

    fetch('http://localhost:8080/logistics/api/v1/order/orders/recent')
      .then((res) => res.json())
      .then((data) => setRecentOrders(data))
      .catch((err) => console.error('Failed to fetch orders:', err));
  }, []);

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Admin Panel</div>
        <div className="list-group list-group-flush">
          <a href="/admin-dashboard" className="list-group-item list-group-item-action bg-dark text-white active">Dashboard</a>
          <a href="/admin-manage-users" className="list-group-item list-group-item-action bg-dark text-white">Manage Users</a>
          <a href="/admin-modify-order" className="list-group-item list-group-item-action bg-dark text-white">Modify Order</a>
          <a href="/admin-create-delivery" className="list-group-item list-group-item-action bg-dark text-white">Create Delivery</a>
          <a href="/admin-view-deliveries" className="list-group-item list-group-item-action bg-dark text-white">View Deliveries</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page Content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Welcome, {userName}</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card text-bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Orders</h5>
                <p className="card-text fs-4">{recentOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Active Drivers</h5>
                <p className="card-text fs-4">18</p> {/* TODO: replace with the dynamic data */}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">Pending Deliveries</h5>
                <p className="card-text fs-4">7</p> {/* TODO: replace with the dynamic data */}
              </div>
            </div>
          </div>
        </div>

        <h4 className="mt-5">Recent Orders</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Driver</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.order_id}>
                <td>#{String(order.order_id).padStart(5, '0')}</td>
                <td>{order.order_customer_name}</td>
                <td>
                  <span className={`badge ${
                    order.order_status === 'delivered'
                      ? 'bg-success'
                      : order.order_status === 'cancelled'
                      ? 'bg-warning text-dark'
                      : 'bg-secondary'
                  }`}>
                    {order.order_status}
                  </span>
                </td>
                <td>{order.assigned_driver_name || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
