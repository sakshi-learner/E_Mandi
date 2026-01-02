import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/auth";
import { getProducts, saveProducts, getProductsByFarmer } from "../../utils/product";
import { getOrders, saveOrders, getOrdersByFarmer } from "../../utils/orders";
import { CheckCircle, XCircle, Trash2, PlusCircle } from "lucide-react";

export default function FarmerDashboard() {
  const user = getCurrentUser();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    setProducts(getProductsByFarmer(user.email));
    setOrders(getOrdersByFarmer(user.email));
  }, [user.email]);

  const addProduct = () => {
    const all = getProducts();
    all.push({
      ...form,
      id: Date.now(),
      farmer: user.name,
      farmerEmail: user.email,
      location: user.location,
    });
    saveProducts(all);
    setProducts(getProductsByFarmer(user.email));
    setForm({});
  };

  const updateStatus = (id, status) => {
    const updated = getOrders().map(o =>
      o.id === id ? { ...o, status } : o
    );
    saveOrders(updated);
    setOrders(getOrdersByFarmer(user.email));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Farmer Dashboard
      </h2>

      {/* Add Product */}
      <div className="card max-w-xl mb-8">
        <h3 className="font-semibold mb-2">➕ Add Product</h3>
        {["name","price","image","contact"].map(f => (
          <input
            key={f}
            className="input mt-2"
            placeholder={f}
            value={form[f] || ""}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
          />
        ))}
        <button className="btn-primary mt-3 flex items-center gap-1" onClick={addProduct}>
          <PlusCircle size={16} /> Add Product
        </button>
      </div>

      {/* Orders */}
      <h3 className="font-semibold text-lg mb-3">🔔 Order Requests</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {orders.filter(o => o.status === "pending").map(o => (
          <div key={o.id} className="card border-l-4 border-yellow-500">
            <h4 className="font-bold">{o.productName}</h4>
            <p>Buyer: {o.buyerEmail}</p>
            <p>₹ {o.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                className="btn-primary flex gap-1 items-center"
                onClick={() => updateStatus(o.id, "confirmed")}
              >
                <CheckCircle size={16} /> Confirm
              </button>
              <button
                className="btn-outline flex gap-1 items-center"
                onClick={() => updateStatus(o.id, "cancelled")}
              >
                <XCircle size={16} /> Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sale History */}
      <h3 className="font-semibold text-lg mt-10 mb-3">📦 Sale History</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {orders.filter(o => o.status === "confirmed").map(o => (
          <div key={o.id} className="card border-l-4 border-green-600">
            <h4 className="font-bold">{o.productName}</h4>
            <p>Buyer: {o.buyerEmail}</p>
            <p>₹ {o.price}</p>
            <p className="text-xs text-gray-500">{o.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
