import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token || !user) {
    // Redirect to login if there's no token or user data
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 