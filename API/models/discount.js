import mongoose from "mongoose";
const DiscountSchema = new mongoose.Schema({
    event: { type: String }, // ex: "Promotion Ramadan"
    code: { type: String }, // ex: "ramadan2026"
    percentage: { type: Number, min: 0, max: 1, required: true },
    usedtimes: { type: Number, default: 0 },
    maxUses: { type: Number }, 
    usersUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    expirationDate: { type: Date },
}, { timestamps: true });

export  const Discount = mongoose.model("Discount", DiscountSchema)
