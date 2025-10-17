// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL to uploaded image
    description: { type: String, default: "" },
    stock: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
