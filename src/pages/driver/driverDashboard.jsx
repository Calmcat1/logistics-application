import React, { useEffect, useState } from 'react';

const DriverDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [driverName, setDriverName] = useState('');

  // Step 1: Load driver info from localStorage
  useEffect(() => {
    const driverData = JSON.parse(localStorage.getItem('user'));
    if (driverData && driverData.name) {
      setDriverName(driverData.name);
    }
  }, []);

  // Step 2: Fetch deliveries for the driver
  useEffect(() => {
    if (!driverName) return;

    fetch(`http://localhost:8080/logistics/api/v1/delivery/deliveries/user/${driverName}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Fetched deliveries:', data);
        setDeliveries(data);
      })
      .catch((err) => console.error('Failed to fetch deliveries:', err));
  }, [driverName]);

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Driver Panel</div>
        <div className="list-group list-group-flush">
          <a href="/driver-dashboard" className="list-group-item list-group-item-action bg-dark text-white active">Dashboard</a>
          <a href="/driver-update-status" className="list-group-item list-group-item-action bg-dark text-white">Update Status</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Welcome, {driverName || 'Driver'}</h2>

        <h4 className="mt-5">Current Assignments</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>Driver Assigned</th>
              <th>Status</th>
              <th>ETA</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan="4">No deliveries assigned.</td>
              </tr>
            ) : (
              deliveries.map((delivery) => (
                <tr key={delivery.delivery_id}>
                  <td>#{delivery.delivery_id}</td>
                  <td>{delivery.delivery_driver_name}</td>
                  <td>
                    <span className={`badge ${
                      delivery.delivery_status === 'delivered' ? 'bg-success' :
                      delivery.delivery_status === 'cancelled' ? 'bg-danger' :
                      'bg-warning text-dark'
                    }`}>
                      {delivery.delivery_status}
                    </span>
                  </td>
                  <td>{delivery.delivery_ETA}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverDashboard;
