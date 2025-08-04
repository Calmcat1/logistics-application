import React, { useEffect, useState } from 'react';

const DriverModifyDelivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchDeliveries = async () => {
      setLoading(true);
      try {
        const driverData = JSON.parse(localStorage.getItem('user'));
        const driverName = driverData?.name;

        const response = await fetch(`http://localhost:8080/logistics/api/v1/delivery/deliveries/user/${driverName}`);
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

  const openEditPopup = (delivery) => {
    setSelectedDelivery(delivery);
    setNewStatus(delivery.delivery_status);
  };

  const closePopup = () => {
    setSelectedDelivery(null);
    setNewStatus('');
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/logistics/api/v1/delivery/deliveries/${selectedDelivery.delivery_id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ delivery_status: newStatus }),
        }
      );

      if (response.ok) {
        setDeliveries((prev) =>
          prev.map((d) =>
            d.delivery_id === selectedDelivery.delivery_id
              ? { ...d, delivery_status: newStatus }
              : d
          )
        );
        closePopup();
        console.log('Delivery status updated successfully');
      } else {
        console.error('Failed to update delivery status');
      }
    } catch (error) {
      console.error('Error updating delivery:', error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading deliveries...</div>;

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Driver Panel</div>
        <div className="list-group list-group-flush">
          <a href="/driver-dashboard" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="/driver-modify-status" className="list-group-item list-group-item-action bg-dark text-white active">Update Status</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Update Delivery Status</h2>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Delivery ID</th>
              <th>Driver Assigned</th>
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
                  <td>{delivery.delivery_id}</td>
                  <td>{delivery.delivery_driver_name}</td>
                  <td>{delivery.delivery_status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openEditPopup(delivery)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {selectedDelivery && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Delivery Status</h5>
                <button type="button" className="btn-close" onClick={closePopup}></button>
              </div>
              <div className="modal-body">
                <p><strong>Delivery ID:</strong> {selectedDelivery.delivery_id}</p>
                <p><strong>Driver:</strong> {selectedDelivery.delivery_driver_name}</p>
                <div className="mb-3">
                  <label htmlFor="deliveryStatus" className="form-label">New Status</label>
                  <select
                    id="deliveryStatus"
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="in progress">In Progress</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closePopup}>Cancel</button>
                <button className="btn btn-success" onClick={handleUpdateStatus}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverModifyDelivery;
