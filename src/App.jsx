import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {user?.role === "buyer" && (
          <>
            <Route path="/buyer" element={<BuyerDashboard />} />
            <Route path="*" element={<Navigate to="/buyer" />} />
          </>
        )}

        {user?.role === "farmer" && (
          <>
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="*" element={<Navigate to="/farmer" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
