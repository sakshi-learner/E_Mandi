import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="flex justify-between p-4 bg-green-600 text-white">
      <h1 className="font-bold">E-Mandi</h1>

      {!user ? (
        <div className="flex gap-4">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <span>{user.name}</span>
          <button onClick={logoutUser} className="bg-white text-green-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
