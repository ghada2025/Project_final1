import express from "express";
import { createProduct, deleteProduct, getBestProducts, getBrands, getName, getProduct, getProducts, updateProduct } from "../controllers/products.js";
import { verifyIfAdmin } from "../middleware/verifyIfAdmin.js";


const router = express.Router();
router.get("/", getProducts);
router.get("/bestsellers", getBestProducts);
router.get("/brands" , getBrands);
router.get("/name" , getName);
router.get("/:id", getProduct);
router.post("/", createProduct); // verify if admin
router.put("/:id", verifyIfAdmin, updateProduct); // verify if admin
router.delete("/:id", verifyIfAdmin, deleteProduct); //verify if admin

// GET 6 BEST Sellers -> sort by countSold + limit 6
export { router as productRouter };