import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

/**
 * ProtectedRoute
 * @param {element} children - component to render if authorized
 * @param {string} role - role required to access this route ("buyer" / "farmer")
 */
export default function ProtectedRoute({ children, role }) {
  const user = getCurrentUser();

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role → redirect to home or dashboard
    return <Navigate to="/" replace />;
  }

  return children;
}
