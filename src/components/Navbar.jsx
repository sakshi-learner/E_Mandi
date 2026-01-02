import { LogOut, Leaf } from "lucide-react";
import { logout, getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 py-3">
      <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
        <Leaf /> E-Mandi
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">
          {user.role.toUpperCase()}
        </span>
        <button
          className="btn-outline flex items-center gap-1"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}
