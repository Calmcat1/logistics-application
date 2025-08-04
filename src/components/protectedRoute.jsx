// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Adjust key as needed

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
