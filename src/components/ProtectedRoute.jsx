import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

export default function ProtectedRoute({ role, children }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/login" />;
  return children;
}
