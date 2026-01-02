import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getProducts, saveProducts } from "../../utils/product";
import { getCurrentUser } from "../../utils/auth";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

export default function FarmerDashboard() {
  const user = getCurrentUser();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  const [updateIndex, setUpdateIndex] = useState(null);

  useEffect(() => {
    const prods = getProducts() || [];
    setAllProducts(prods);
    setProducts(prods.filter(p => p.farmer === user.username));
  }, []);

  const addProduct = () => {
    const newProd = { ...form, farmer: user.username, location: user.location };
    const updatedAll = [...allProducts, newProd];
    saveProducts(updatedAll);
    setAllProducts(updatedAll);
    setProducts(updatedAll.filter(p => p.farmer === user.username));
    setForm({});
  };

  const deleteProduct = (index) => {
    const prodToDelete = products[index];
    const updatedAll = allProducts.filter(p => p !== prodToDelete);
    saveProducts(updatedAll);
    setAllProducts(updatedAll);
    setProducts(updatedAll.filter(p => p.farmer === user.username));
  };

  const openUpdateModal = (index) => {
    setUpdateIndex(index);
    setForm({ ...products[index] });
  };

  const updateProduct = () => {
    const prodToUpdate = products[updateIndex];
    const updatedAll = allProducts.map(p => (p === prodToUpdate ? { ...p, ...form } : p));
    saveProducts(updatedAll);
    setAllProducts(updatedAll);
    setProducts(updatedAll.filter(p => p.farmer === user.username));
    setForm({});
    setUpdateIndex(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Account Section */}
      <div className="mb-6 p-4 bg-white rounded shadow flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-green-700">Welcome, {user.name}</h3>
          <p className="text-gray-600">Username: {user.name}</p>
          <p className="text-gray-600">Location: {user.location}</p>
        </div>
       
      </div>

      <h2 className="text-2xl font-bold mb-4 text-green-700">Farmer Dashboard</h2>

      {/* Add Product Form */}
      <div className="card max-w-3xl mb-6 p-4">
        <div className="grid grid-cols-2 gap-2">
          {["name","price","weight","type","tag","image","contact"].map((f) => (
            <input
              key={f}
              className="border rounded px-2 py-1"
              placeholder={f}
              value={form[f] || ""}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
            onClick={addProduct}
          >
            <PlusCircle size={16} /> Add
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p, idx) => (
          <div key={idx} className="bg-white p-3 rounded shadow">
            <img src={p.image || "https://via.placeholder.com/150"} className="h-32 w-full object-cover rounded" />
            <h3 className="font-bold mt-2">{p.name}</h3>
            <p>₹{p.price}</p>
            <p>Weight: {p.weight || "N/A"} kg</p>
            <p>Contact: {p.contact}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 bg-blue-600 text-white rounded px-2 py-1 flex items-center justify-center gap-1"
                onClick={() => openUpdateModal(idx)}
              >
                <Edit size={16} /> Update
              </button>

              <button
                className="flex-1 bg-red-500 text-white rounded px-2 py-1 flex items-center justify-center gap-1"
                onClick={() => deleteProduct(idx)}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      <Dialog open={updateIndex !== null} onClose={() => setUpdateIndex(null)}>
        <DialogTitle className="text-green-700 font-bold">Update Product</DialogTitle>
        <DialogContent className="grid gap-2">
          {["name","price","weight","type","tag","image","contact"].map((f) => (
            <TextField
              key={f}
              label={f}
              value={form[f] || ""}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              fullWidth
              size="small"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateIndex(null)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={updateProduct}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
