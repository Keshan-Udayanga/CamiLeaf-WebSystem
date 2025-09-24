
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  const userRole = role?.toUpperCase();

  const isAuthorized = allowedRoles?.map(r => r.toUpperCase()).includes(userRole);
 
  if (!token || !isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;