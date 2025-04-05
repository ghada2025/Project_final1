import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema({
    wilaya: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ["home", "office"], required: true },
}, { timestamps: true });

export  const Shipping = mongoose.model("Shipping", ShippingSchema)