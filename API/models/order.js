import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },    
    address: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    products: [{ 
        quantity: Number,
        product: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
        }
    }],
    shipping: { type:mongoose.Schema.Types.ObjectId, ref: "Shipping" },
    status: { type: String, enum: ["pending", "done", "rejected"], default: "pending" },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
}, { timestamps: true });   

export  const Order = mongoose.model("Order", OrderSchema)