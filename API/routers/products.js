import express from "express";
import {
    createProduct,
    deleteProduct,
    getBestProducts,
    getBrands,
    getColors,
    getdiscountedProducts,
    getHotDeals,
    getNewArrival,
    getProduct,
    getProducts,
    updateProduct
} from "../controllers/products.js";

import { verifyIfAdmin } from "../middleware/verifyIfAdmin.js";

const router = express.Router();

// 📦 Produits publics
router.get("/bestsellers", getBestProducts);
router.get("/discounted", getdiscountedProducts);
router.get("/hotDeals", getHotDeals);
router.get("/newArrival", getNewArrival);
router.get("/brands", getBrands);
router.get("/colors", getColors);
router.get("/", getProducts);
router.get("/:id", getProduct);

// 🔒 Produits côté admin
router.post("/", verifyIfAdmin, createProduct);
router.put("/:id", verifyIfAdmin, updateProduct);
router.delete("/:id", verifyIfAdmin, deleteProduct);

export { router as productRouter };
