import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth/authStyles/Auth.css'; // custom styles

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    user_role: 'driver',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data being sent:', formData)
    try {
      const response = await fetch('http://localhost:8080/logistics/api/v1/user/user-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/login'), 2000); // Delay then navigate
    } catch (err) {
      setSuccess(false);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h3 className="text-center mb-4">Sign Up</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="user_name"
            placeholder="Your Name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="user_email"
            placeholder="you@example.com"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="user_password"
            placeholder="Password"
            value={formData.user_password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            id="user_role"
            value={formData.user_role}
            onChange={handleChange}
            required
          >
            <option value="driver">Driver</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>

      {/* ✅ Alerts */}
      {success && (
        <div className="alert alert-success mt-3 d-flex align-items-center" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          Registration successful! Redirecting to login...
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3 d-flex align-items-center" role="alert">
          <i className="bi bi-x-circle-fill me-2"></i>
          {error}
        </div>
      )}
    </div>
  );
};

export default Register;
