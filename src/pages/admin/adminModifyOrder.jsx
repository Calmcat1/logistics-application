import React, { useEffect, useState } from 'react';

const AdminModifyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/logistics/api/v1/order/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openEditPopup = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.order_status);
  };

  const closePopup = () => {
    setSelectedOrder(null);
    setNewStatus('');
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8080/logistics/api/v1/order/orders/${selectedOrder.order_id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_status: newStatus }),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === selectedOrder.order_id
              ? { ...order, order_status: newStatus }
              : order
          )
        );
        closePopup();
        console.log('Order status updated successfully');
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading orders...</div>;

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Admin Panel</div>
        <div className="list-group list-group-flush">
          <a href="/admin-dashboard" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="/admin-manage-users" className="list-group-item list-group-item-action bg-dark text-white">Manage Users</a>
          <a href="/admin-modify-order" className="list-group-item list-group-item-action bg-dark text-white active">Modify Order</a>
          <a href="/admin-create-delivery" className="list-group-item list-group-item-action bg-dark text-white">Create Delivery</a>
          <a href="/admin-view-deliveries" className="list-group-item list-group-item-action bg-dark text-white">View Deliveries</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Modify Orders</h2>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.order_customer_name}</td>
                  <td>{order.order_destination}</td>
                  <td>{order.order_status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openEditPopup(order)}
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
      {selectedOrder && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Order Status</h5>
                <button type="button" className="btn-close" onClick={closePopup}></button>
              </div>
              <div className="modal-body">
                <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
                <p><strong>Order Customer:</strong> {selectedOrder.order_customer_name}</p>
                <div className="mb-3">
                  <label htmlFor="orderStatus" className="form-label">New Status</label>
                  <select
                    id="orderStatus"
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="in progress">In Progress</option>
                    <option value="delivered">delivered</option>
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

export default AdminModifyOrder;
