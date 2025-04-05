import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema({
    event: { type: String, required: true },
    code: { type: String, required: true },
    usedtimes: { type: Number, required: true },
    percentage: { type: Number,min: 0,max: 1, required: true },
}, { timestamps: true });

export  const Discount = mongoose.model("Discount", DiscountSchema)