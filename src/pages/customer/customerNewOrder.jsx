import React, { useState } from 'react';

const NewOrder = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    order_customer_name: userData.name || '',
    order_customer_email: userData.email || '',
    order_destination: '',
    order_date: '',
    order_package: '',
    order_status: 'in progress'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/logistics/api/v1/order/add-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Order submitted successfully!');
        setFormData({
          ...formData,
          order_destination: '',
          order_date: '',
          order_package: '',
          order_status: 'in progress'
        });
      } else {
        const errData = await response.json();
        setError(errData.message || 'Failed to create order');
      }
    } catch (err) {
      console.error(err);
      setError('Error creating order');
    }
  };

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Customer Panel</div>
        <div className="list-group list-group-flush">
          <a href="/customer-dashboard" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="/customer-track-orders" className="list-group-item list-group-item-action bg-dark text-white">Track Orders</a>
          <a href="/customer-new-order" className="list-group-item list-group-item-action bg-dark text-white active">New Order</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Place New Order</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-light rounded" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input type="text" name="order_customer_name" className="form-control" value={formData.order_customer_name} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Destination</label>
            <input type="text" name="order_destination" className="form-control" value={formData.order_destination} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Order Date</label>
            <input type="date" name="order_date" className="form-control" value={formData.order_date} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Package Description</label>
            <input type="text" name="order_package" className="form-control" value={formData.order_package} onChange={handleChange} required />
          </div>


          <button type="submit" className="btn btn-primary">Submit Order</button>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
