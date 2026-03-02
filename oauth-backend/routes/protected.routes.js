import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, loading, children }) => {
  
  if (loading) {
    return <div>Loading your dashboard...</div>;
  }

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;