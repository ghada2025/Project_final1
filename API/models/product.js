import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: [String], required: true },
    size: { type: [String], required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    soldcount: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    discount: { type: Number, min: 0, max: 1, required: true },
}, { timestamps: true });

export  const Product = mongoose.model("Product", ProductSchema)