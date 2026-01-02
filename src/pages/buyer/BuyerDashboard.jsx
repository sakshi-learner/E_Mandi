import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/auth";
import { getProducts } from "../../utils/product";
import { placeOrder, getOrdersByBuyer } from "../../utils/orders";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { ShoppingCart, Info } from "lucide-react";

export default function BuyerDashboard() {
  const user = getCurrentUser();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [orders, setOrders] = useState([]);

  const [note, setNote] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    setProducts(getProducts());
    setOrders(getOrdersByBuyer(user.email));
  }, [user.email]);

  const handleOrder = (product) => {
    placeOrder({
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      price: product.price,
      buyerEmail: user.email,
      farmerEmail: product.farmerEmail,
      farmerName: product.farmer,
      note: note,
      status: "pending",
      date: new Date().toLocaleString(),
    });

    setOrders(getOrdersByBuyer(user.email));
    setNote("");
    setSelectedProduct(null);
    alert("Order placed successfully");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Welcome, {user.name}</h2>

      {/* Search */}
      <input
        className="input mb-4"
        placeholder="Search by product or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Products */}
      <h3 className="font-semibold mb-2">Available Products</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="card">
            <img
              src={p.image}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h4 className="font-bold">{p.name}</h4>
            <p>₹ {p.price}</p>
            <p className="text-sm text-gray-500">{p.location}</p>

            <div className="flex gap-2 mt-2">
              <button
                className="btn-outline flex items-center gap-1"
                onClick={() => setSelected(p)}
              >
                <Info size={16} /> Details
              </button>

              <button
                className="btn-primary flex items-center gap-1"
                onClick={() => setSelectedProduct(p)}
              >
                <ShoppingCart size={16} /> Order
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr className="m-5" />

      {/* Order History */}
      <h3 className="font-semibold mt-8 mb-2">🛒 My Orders</h3>

      {orders.length === 0 && <p>No orders yet</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {orders.map((o) => (
          <div key={o.id} className="card">
            <p className="font-bold">{o.productName}</p>
            <p>Status: <b>{o.status}</b></p>
            <p>₹ {o.price}</p>
            <p className="text-sm">{o.date}</p>
          </div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onClose={() => setSelected(null)}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {selected && (
            <>
              <img
                src={selected.image}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <p><b>Name:</b> {selected.name}</p>
              <p><b>Price:</b> ₹ {selected.price}</p>
              <p><b>Farmer:</b> {selected.farmer}</p>
              <p><b>tag:</b> {selected.tag}</p>
              <p><b>type:</b> {selected.type}</p>
              <p><b>Location:</b> {selected.location}</p>
              <p className="mt-2">
                <b>Contact:</b>
              </p>

              <a
                href={`tel:${selected.contact}`}
                className="inline-block mt-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
              >
                📞 Call Farmer
              </a>

            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        <DialogTitle>
          Order: {selectedProduct?.name}
        </DialogTitle>

        <DialogContent>
          <p className="mb-2 text-sm text-gray-600">
            You can send a note to the farmer
          </p>

          <textarea
            className="w-full border rounded-lg p-2"
            placeholder="Write a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelectedProduct(null)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={() => handleOrder(selectedProduct)}
          >
            Send Order
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
