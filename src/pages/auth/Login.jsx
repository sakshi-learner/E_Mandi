import { Card } from "@mui/material";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { login } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!login(email, password, role)) {
      alert("Invalid credentials");
      return;
    }
    navigate(role === "farmer" ? "/farmer" : "/buyer");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="p-6 w-95">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={submit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={18}/>
            <input className="input pl-10" placeholder="Email" required
              onChange={e=>setEmail(e.target.value)} />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={18}/>
            <input className="input pl-10" type="password" placeholder="Password" required
              onChange={e=>setPassword(e.target.value)} />
          </div>

          <select className="input" onChange={e=>setRole(e.target.value)}>
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>

          <button className="btn-primary w-full">Login</button>
        </form>

        <p className="text-sm text-center mt-3">
          New user? <Link to="/signup" className="text-green-600">Signup</Link>
        </p>
      </Card>
    </div>
  );
}
