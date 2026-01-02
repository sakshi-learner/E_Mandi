import { useState } from "react";
import { signup, getCurrentUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  const handleSignup = () => {
    signup({ name, email, password, role });
    setUser(getCurrentUser());
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input
          placeholder="Name"
          className="input mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          className="input mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="input mb-2">
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>
        <button onClick={handleSignup} className="btn-primary w-full">Signup</button>
      </div>
    </div>
  );
}
