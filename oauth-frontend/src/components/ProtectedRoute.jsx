import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Redirect to login if no user is found in state
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;