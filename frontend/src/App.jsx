import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import AddProduct from "./components/AddProduct";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

export default function App() {
  const [products, setProducts] = useState([]);
  const API_BASE = "http://localhost:5000";

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin/Form column */}
          <aside className="lg:col-span-1">
            <AddProduct onAdded={fetchProducts} />
          </aside>

          {/* Products */}
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Latest Gear</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <div className="col-span-full text-gray-300">No products yet. Add one using the form.</div>
              ) : (
                products.map((p) => <ProductCard key={p._id ?? p.id} product={p} />)
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
