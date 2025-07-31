import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth/authStyles/Auth.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/logistics/api/v1/user/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.error || 'Login failed');
      }

      const result = await response.json();
      console.log('Login successful:', result);

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      if (result.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (result.user.role === 'driver') {
        navigate('/driver-dashboard');
      } else if (result.user.role === 'customer') {
        navigate('/customer-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h3 className="text-center mb-4">Sign In</h3>

      <form onSubmit={handleSubmit}>
        {errorMsg && <div className="alert alert-danger text-center">{errorMsg}</div>}

        <div className="mb-3">
          <input
            type="email"
            name="user_email"
            className="form-control"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="user_password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
