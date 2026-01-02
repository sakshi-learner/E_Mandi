import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUsers } from "../../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = getUsers().find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!user) return alert("Invalid credentials");

    loginUser(user); // 🔥 STATE UPDATE
    navigate(role === "buyer" ? "/buyer" : "/farmer");
  };

  return (
    <div className="max-w-md mx-auto mt-20 card">
      <h2 className="text-xl font-bold mb-3">Login</h2>
      <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="input mt-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <select className="input mt-2" onChange={e => setRole(e.target.value)}>
        <option value="buyer">Buyer</option>
        <option value="farmer">Farmer</option>
      </select>
      <button className="btn-primary mt-4 w-full" onClick={handleLogin}>Login</button>
    </div>
  );
}
