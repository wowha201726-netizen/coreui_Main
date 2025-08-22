import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // your auth logic here
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to sign-in, save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children (protected content)
  return children;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
