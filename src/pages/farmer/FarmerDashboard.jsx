import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/auth";
import {
  getProducts,
  saveProducts,
  getProductsByFarmer,
} from "../../utils/product";
import {
  getOrders,
  getOrdersByFarmer,
  saveOrders,
} from "../../utils/orders";

export default function FarmerDashboard() {
  const user = getCurrentUser();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!user) return;
    setProducts(getProductsByFarmer(user.email));
    setOrders(getOrdersByFarmer(user.email));
  }, [user?.email]);

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

  const deleteProduct = (id) => {
    const updated = getProducts().filter((p) => p.id !== id);
    saveProducts(updated);
    setProducts(getProductsByFarmer(user.email));
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setForm(product);
  };

  const updateProduct = () => {
    const updated = getProducts().map((p) =>
      p.id === editId ? { ...p, ...form } : p
    );
    saveProducts(updated);
    setProducts(getProductsByFarmer(user.email));
    setEditId(null);
    setForm({});
  };

  const updateOrderStatus = (id, status) => {
    const updated = getOrders().map((o) =>
      o.id === id ? { ...o, status } : o
    );
    saveOrders(updated);
    setOrders(getOrdersByFarmer(user.email));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user?.name}
      </h2>

      {/* Add / Update Product */}
      <div className="bg-white rounded-xl shadow p-4 max-w-xl mb-6">
        {["name","tag","type","price","weight","location", "image", "contact"].map((f) => (
          <input
            key={f}
            className="w-full border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={f}
            value={form[f] || ""}
            onChange={(e) =>
              setForm({ ...form, [f]: e.target.value })
            }
          />
        ))}

        {editId ? (
          <button
            onClick={updateProduct}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        ) : (
          <button
            onClick={addProduct}
            className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg cursor-pointer hover:bg-green-700 transition"
          >
            Add Product
          </button>
        )}
      </div>

      {/* Products */}
      <h3 className="font-semibold mb-3 text-lg">My Products</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow p-3"
          >
            <img
              src={p.image}
              className="h-40 w-full object-cover rounded-lg mb-2"
            />
            <h4 className="font-bold">{p.name}</h4>
            <p className="text-gray-600">₹ {p.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => startEdit(p)}
                className="flex-1 border border-blue-500 text-blue-600 py-1 rounded-lg cursor-pointer hover:bg-blue-50 transition"
              >
                Update
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="flex-1 border border-red-500 text-red-600 py-1 rounded-lg cursor-pointer hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr className="m-5"/>
      

      {/* Notifications */}
      <h3 className="font-semibold mt-10 mb-3 text-lg">
        🔔 Order Notifications
      </h3>

      {orders.filter((o) => o.status === "pending").length === 0 && (
        <p className="text-gray-500">No new orders</p>
      )}

      {orders
        .filter((o) => o.status === "pending")
        .map((o) => (
          <div
            key={o.id}
            className="bg-white rounded-xl shadow p-3 mb-3"
          >
            <p className="font-bold">{o.productName}</p>
            <p>Buyer: {o.buyerEmail}</p>
            <p>₹ {o.price}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  updateOrderStatus(o.id, "confirmed")
                }
                className="bg-green-600 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-green-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() =>
                  updateOrderStatus(o.id, "cancelled")
                }
                className="border border-gray-400 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}

      <hr className="m-5"/>  
      {/* Sale History */}
      <h3 className="font-semibold mt-10 mb-3 text-lg">
        📦 Sale History
      </h3>

      {orders
        .filter((o) => o.status === "confirmed")
        .map((o) => (
          <div
            key={o.id}
            className="bg-white rounded-xl shadow p-3 mb-2"
          >
            <p className="font-bold">{o.productName}</p>
            <p>Buyer: {o.buyerEmail}</p>
            <p>₹ {o.price}</p>
            <p className="text-sm text-gray-500">{o.date}</p>
          </div>
        ))}
    </div>
  );
}
