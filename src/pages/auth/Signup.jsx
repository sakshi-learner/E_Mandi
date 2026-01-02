import { Card } from "@mui/material";
import { User, MapPin } from "lucide-react";
import { useState } from "react";
import { signup } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name:"", email:"", password:"", location:"", role:"buyer"
  });
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    signup(form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="p-6 w-95">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

        <form onSubmit={submit} className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400" size={18}/>
            <input className="input pl-10" placeholder="Name"
              onChange={e=>setForm({...form,name:e.target.value})}/>
          </div>

          <input className="input" placeholder="Email"
            onChange={e=>setForm({...form,email:e.target.value})}/>

          <input className="input" type="password" placeholder="Password"
            onChange={e=>setForm({...form,password:e.target.value})}/>

          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18}/>
            <input className="input pl-10" placeholder="Location"
              onChange={e=>setForm({...form,location:e.target.value})}/>
          </div>

          <select className="input"
            onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>

          <button className="btn-primary w-full">Create Account</button>
        </form>

        <p className="text-sm text-center mt-3">
          Already have account? <Link to="/login" className="text-green-600">Login</Link>
        </p>
      </Card>
    </div>
  );
}
