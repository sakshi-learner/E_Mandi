import { Phone, ShoppingCart, Info } from "lucide-react";
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import { getProducts } from "../../utils/product";

export default function BuyerDashboard() {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // for modal
  const products = getProducts();

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Buyer Dashboard</h2>

      {/* Search Bar */}
      <div className="mb-4 max-w-md">
        <input
          type="text"
          placeholder="Search product or location..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length > 0 ? (
          filtered.map((product, idx) => (
            <Card key={idx} className="shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform">
              {/* Uniform Image */}
              <div className="w-full h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <CardContent className="p-2">
                <Typography variant="subtitle1" className="font-bold text-green-700 truncate">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ₹{product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="truncate">
                  {product.location}
                </Typography>
              </CardContent>

              <div className="flex gap-1 p-2">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<ShoppingCart size={16} />}
                  className="flex-1 text-xs py-1"
                >
                  Order
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Info size={16} />}
                  className="flex-1 text-xs py-1"
                  onClick={() => setSelectedProduct(product)}
                >
                  Details
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-6">
            No products found!
          </p>
        )}
      </div>

      {/* Details Modal */}
      <Dialog open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <>
            <DialogTitle className="text-green-700 font-bold">{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <img
                src={selectedProduct.image || "https://via.placeholder.com/300"}
                alt={selectedProduct.name}
                className="w-full h-60 object-contain rounded mb-3"
              />
              <Typography>Price: ₹{selectedProduct.price}</Typography>
              <Typography>Weight: {selectedProduct.weight || "N/A"} kg</Typography>
              <Typography>Type: {selectedProduct.type || "N/A"}</Typography>
              <Typography>Tag: {selectedProduct.tag || "N/A"}</Typography>
              <Typography>Location: {selectedProduct.location}</Typography>
            </DialogContent>
            <DialogActions className="flex justify-between px-4 py-2">
              <Button variant="outlined" color="primary" startIcon={<Phone size={16} />}>
                Contact: {selectedProduct.contact || "N/A"}
              </Button>
              <Button onClick={() => setSelectedProduct(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
