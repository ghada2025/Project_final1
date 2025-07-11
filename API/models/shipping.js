import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema({
    wilaya: { type: String, required: true },
    priceHome: { type: Number, required: true },
    priceOffice: { type: Number, required: true },
}, { timestamps: true });

export  const Shipping = mongoose.model("Shipping", ShippingSchema)