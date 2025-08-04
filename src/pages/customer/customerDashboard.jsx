import React, { useEffect, useState } from 'react';

const CustomerDashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [userName, setUserName] = useState('');

  // Step 1: Load username from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUserName(userData.name);
    }
  }, []);

  // Step 2: Fetch orders AFTER userName is set
  useEffect(() => {
    if (!userName) return;

    fetch(`http://localhost:8080/logistics/api/v1/order/orders/user/${userName}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Fetched orders:', data);
        setRecentOrders(data);
      })
      .catch((err) => console.error('Failed to fetch orders:', err));
  }, [userName]);

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Customer Panel</div>
        <div className="list-group list-group-flush">
          <a href="/customer-dashboard" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="/customer-track-orders" className="list-group-item list-group-item-action bg-dark text-white">Track Orders</a>
          <a href="/customer-new-order" className="list-group-item list-group-item-action bg-dark text-white">New Order</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page Content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Welcome, {userName || 'Customer'}</h2>

        <h4 className="mt-5">Recent Orders</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Pickup</th>
              <th>Status</th>
              <th>Package</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr><td colSpan="4">No recent orders found.</td></tr>
            ) : (
              recentOrders.map((order) => (
                <tr key={order.order_id}>
                  <td>#{order.order_id}</td>
                  <td>{order.order_destination}</td>
                  <td>
                    <span className={`badge ${
                      order.order_status === 'Delivered' ? 'bg-success' :
                      order.order_status === 'Cancelled' ? 'bg-warning text-dark' :
                      'bg-secondary'
                    }`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td>{order.order_package}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDashboard;
