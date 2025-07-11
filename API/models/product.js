import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    color: { type: [String], required: true },
    size: { type: [String], required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    soldcount: { type: Number, required: true, default: 0 },
    stockQuantity: { type: Number, required: true },
    shipping:{type: String, required: true},
    images: [{
        url: { type: String, required: true },
        alt: { type: String },
        main: { type: Boolean, default: false }
    }],
    category: { type: String, required: true },
    brand: { type: String, required: true },
    discount: { type: Number, default: 0 },
    priceAfterDiscount: { type: Number , default: 0 },
}, { timestamps: true });

export  const Product = mongoose.model("Product", ProductSchema)