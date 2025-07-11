import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    wilaya: { type: String, required: true }, 
    type: { type: String, enum: ["home", "office"], required: true },   
    address: { type: String, required: true },
    phoneNumber: {  type: String, required: true },
    products: [{ 
        quantity: Number,
        product: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
        }
    }],
    status: { type: String, enum: ["pending", "done", "rejected"], default: "pending" },
    totalPrice: { type: Number, required: true },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
}, { timestamps: true });   

export  const Order = mongoose.model("Order", OrderSchema)