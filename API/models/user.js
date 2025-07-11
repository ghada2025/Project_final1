import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthday: { type: Date, required: true }, // Accepté en `Date`
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    codePostal: { type: String, required: true, trim: true }, 
    wilaya: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true }, 
    role: { type: String, enum: ["client", "admin"], required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);


