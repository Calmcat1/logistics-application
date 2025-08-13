import React, { useEffect, useState } from 'react';

const AdminViewDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch('http://localhost:8080/logistics/api/v1/delivery/deliveries');
        const data = await response.json();
        setDeliveries(data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const handleDelete = async (deliveryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this delivery?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/logistics/api/v1/delivery/deliveries/${deliveryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeliveries((prev) => prev.filter((d) => d.delivery_id !== deliveryId));
        console.log(`Delivery ${deliveryId} deleted successfully`);
      } else {
        console.error(`Failed to delete delivery ${deliveryId}`);
      }
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading deliveries...</div>;

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Admin Panel</div>
        <div className="list-group list-group-flush">
          <a href="/admin-dashboard" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="/admin-manage-users" className="list-group-item list-group-item-action bg-dark text-white">Manage Users</a>
          <a href="/admin-modify-order" className="list-group-item list-group-item-action bg-dark text-white">Modify Order</a>
          <a href="/admin-create-delivery" className="list-group-item list-group-item-action bg-dark text-white">Create Delivery</a>
          <a href="/admin-view-deliveries" className="list-group-item list-group-item-action bg-dark text-white active">View Deliveries</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">View Deliveries</h2>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Driver Name</th>
              <th>Delivery Customer Name</th>
              <th>Delivery Destination</th>
              <th>ETA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No deliveries found.</td>
              </tr>
            ) : (
              deliveries.map((delivery) => (
                <tr key={delivery.delivery_id}>
                  <td>{delivery.delivery_driver_name}</td>
                  <td>{delivery.delivery_customer_name}</td>
                  <td>{delivery.delivery_destination}</td>
                  <td>{delivery.delivery_ETA}</td>
                  <td>{delivery.delivery_status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(delivery.delivery_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminViewDeliveries;
