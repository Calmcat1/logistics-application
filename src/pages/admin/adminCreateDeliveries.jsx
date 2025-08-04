import React, { useState } from 'react';

const CreateDelivery = () => {
  const [formData, setFormData] = useState({
    delivery_driver_name: '',
    delivery_driver_email: '',
    delivery_ETA: '',
    delivery_status: 'in progress',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/logistics/api/v1/delivery/add-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Delivery created successfully!');
        setFormData({
          delivery_driver_name: '',
          delivery_driver_email: '',
          delivery_ETA: '',
          delivery_status: 'in progress',
        });
      } else {
        const errData = await response.json();
        setError(errData.message || 'Failed to create delivery');
      }
    } catch (err) {
      console.error(err);
      setError('Error creating delivery');
    }
  };

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Admin Panel</div>
        <div className="list-group list-group-flush">
          <a href="/admin-dashboard" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="/admin-manage-users" className="list-group-item list-group-item-action bg-dark text-white">Manage Users</a>
          <a href="/admin-modify-order" className="list-group-item list-group-item-action bg-dark text-white">Modify Order</a>
          <a href="/admin-create-delivery" className="list-group-item list-group-item-action bg-dark text-white active">Create Delivery</a>
          <a href="/admin-view-deliveries" className="list-group-item list-group-item-action bg-dark text-white active">View Deliveries</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Create New Delivery</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-light rounded" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label className="form-label">Driver Name</label>
            <input
              type="text"
              name="delivery_driver_name"
              className="form-control"
              value={formData.delivery_driver_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Driver Email</label>
            <input
              type="email"
              name="delivery_driver_email"
              className="form-control"
              value={formData.delivery_driver_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Estimated Time of Arrival (ETA)</label>
            <input
              type="text"
              name="delivery_ETA"
              className="form-control"
              value={formData.delivery_ETA}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Delivery Status</label>
            <select
              name="delivery_status"
              className="form-select"
              value={formData.delivery_status}
              onChange={handleChange}
              required
            >
              <option value="in progress">In Progress</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit Delivery</button>
        </form>
      </div>
    </div>
  );
};

export default CreateDelivery;
