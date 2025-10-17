import { useState } from "react";

export default function AddProduct({ onAdded }) {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState(10);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://respawn-c0al.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !brand || !category || !price) {
      return alert("Title, brand, category and price are required.");
    }

    setLoading(true);
    try {
      let imageUrl = "";

      // If file selected, upload it
      if (file) {
        const fd = new FormData();
        fd.append("image", file);
        const uploadRes = await fetch(`${API_BASE}/api/upload`, {
          method: "POST",
          body: fd,
        });
        const uploadData = await uploadRes.json();
        if (!uploadData.imageUrl) throw new Error(uploadData.message || "Upload failed");
        imageUrl = uploadData.imageUrl;
      } else {
        // If no file, fallback to placeholder or ask user to upload
        const proceed = confirm("No image selected — continue with empty image?");
        if (!proceed) {
          setLoading(false);
          return;
        }
      }

      // Create product
      const productRes = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          brand,
          category,
          price: Number(price),
          image: imageUrl,
          description: desc,
          stock: Number(stock),
        }),
      });

      const productData = await productRes.json();
      if (productData?._id || productData?.id) {
        alert("Product added successfully");
        // clear form
        setTitle(""); setBrand(""); setCategory(""); setPrice(""); setDesc(""); setStock(10); setFile(null);
        if (onAdded) onAdded();
      } else {
        throw new Error(productData.message || "Could not add product");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-white text-lg font-bold mb-4">Add Product</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-2 rounded bg-gray-900 text-white" />
      <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="w-full p-2 mb-2 rounded bg-gray-900 text-white" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full p-2 mb-2 rounded bg-gray-900 text-white" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" className="w-full p-2 mb-2 rounded bg-gray-900 text-white" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description (optional)" className="w-full p-2 mb-2 rounded bg-gray-900 text-white" />
      <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" type="number" className="w-full p-2 mb-2 rounded bg-gray-900 text-white" />

      <label className="block text-sm text-gray-300 mb-2">Product Image</label>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="mb-3 text-sm text-gray-300" />

      <button type="submit" disabled={loading} className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold">
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}
