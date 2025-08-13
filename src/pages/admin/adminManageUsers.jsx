import React, { useEffect, useState } from 'react';

const AdminManageUsers = () => {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/logistics/api/v1/user/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/logistics/api/v1/user/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.user_id !== userId));
        console.log(`user ${userId} deleted successfully`);
      } else {
        console.error(`Failed to delete user ${userId}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading users...</div>;

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark border-end text-white" id="sidebar-wrapper">
        <div className="sidebar-heading p-3 fs-4 fw-bold">Admin Panel</div>
        <div className="list-group list-group-flush">
          <a href="/admin-dashboard" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="/admin-manage-users" className="list-group-item list-group-item-action bg-dark text-white active">Manage Users</a>
          <a href="/admin-modify-order" className="list-group-item list-group-item-action bg-dark text-white">Modify Order</a>
          <a href="/admin-create-delivery" className="list-group-item list-group-item-action bg-dark text-white">Create Delivery</a>
          <a href="/admin-view-deliveries" className="list-group-item list-group-item-action bg-dark text-white">View Deliveries</a>
          <a href="/login" className="list-group-item list-group-item-action bg-dark text-white">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4 w-100">
        <h2 className="mb-4">Manage Users</h2>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No users found.</td>
              </tr>
            ) : (
              user.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>{user.user_role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
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

export default AdminManageUsers;
