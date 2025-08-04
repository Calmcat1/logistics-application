import React, { useEffect, useState } from 'react';

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState();

   const userData = JSON.parse(localStorage.getItem('user'));
   const customerName = userData.name
   console.log(customerName)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8080/logistics/api/v1/order/orders/user/${customerName}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
}, [customerName]);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/logistics/api/v1/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOrders((prevOrders) => prevOrders.filter(order => order.orderId !== orderId));
        console.log(`Order ${orderId} deleted successfully`);
      } else {
        console.error(`Failed to delete order ${orderId}`);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading orders...</div>;

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Customer Panel</div>
        <div className="list-group list-group-flush">
          <a href="/customer-dashboard" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="/customer-track-orders" className="list-group-item list-group-item-action bg-dark text-white active">Track Orders</a>
          <a href="/customer-new-order" className="list-group-item list-group-item-action bg-dark text-white">New Order</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Track Your Orders</h2>

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
                <td colSpan="7" className="text-center">No orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.order_customer_name}</td>
                  <td>{order.order_destination}</td>
                  <td>
                    <span className={`badge ${
                      order.order_status === 'Delivered' ? 'bg-success' :
                      order.order_status === 'In Transit' ? 'bg-warning text-dark' :
                      'bg-secondary'
                    }`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(order.orderId)}
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

export default TrackOrders;
