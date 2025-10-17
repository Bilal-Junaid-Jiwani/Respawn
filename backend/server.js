// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import Product from "./models/Product.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Make uploads folder publicly accessible
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Multer setup for local uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
app.get("/", (req, res) => res.send("Respawn backend is running"));

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create product
app.post("/api/products", async (req, res) => {
  try {
    const { title, brand, category, price, image, description, stock } = req.body;
    if (!title || !brand || !category || !price || !image) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const newProduct = new Product({
      title,
      brand,
      category,
      price,
      image,
      description,
      stock: stock || 10,
    });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
});

// Image upload route (form-data: key "image" -> file)
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Build public URL
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// Start
app.listen(PORT, () => console.log(`🚀 Respawn backend running on http://localhost:${PORT}`));
