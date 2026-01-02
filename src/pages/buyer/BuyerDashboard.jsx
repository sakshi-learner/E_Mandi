import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/auth";
import { getProducts } from "../../utils/product";
import { placeOrder, getOrdersByBuyer } from "../../utils/orders";
import { Search, ShoppingCart } from "lucide-react";

export default function BuyerDashboard() {
  const user = getCurrentUser();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(getProducts());
    setOrders(getOrdersByBuyer(user.email));
  }, [user.email]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Buyer Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Browse fresh products directly from farmers
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Search by product or location"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-40 w-full bg-gray-200">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-gray-800 text-lg">
                {p.name}
              </h3>

              <p className="text-green-600 font-bold">
                ₹ {p.price}
              </p>

              <p className="text-sm text-gray-500">
                📍 {p.location}
              </p>
            </div>

            {/* ACTION */}
            <div className="px-4 pb-4">
              <button
                onClick={() => {
                  placeOrder({
                    id: Date.now(),
                    productName: p.name,
                    price: p.price,
                    buyerEmail: user.email,
                    farmerEmail: p.farmerEmail,
                    status: "pending",
                    date: new Date().toLocaleString()
                  });
                  setOrders(getOrdersByBuyer(user.email));
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          My Orders
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {orders.map(o => (
            <div
              key={o.id}
              className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-600"
            >
              <h4 className="font-semibold">{o.productName}</h4>
              <p className="text-sm">₹ {o.price}</p>
              <p className="text-xs text-gray-500">{o.date}</p>
              <span className="text-sm font-medium">
                Status: {o.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
