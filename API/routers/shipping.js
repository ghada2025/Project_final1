import express from "express";
import { verifyIfAdmin } from "../middleware/verifyIfAdmin.js";
import { createShipping, deleteShipping, getAllShippings, getOneShipping, updateShipping } from "../controllers/shipping.js";

const router = express.Router();

router.get("/", getAllShippings);
router.get("/:wilaya", getOneShipping);
router.post("/", verifyIfAdmin, createShipping);
router.put("/:id", verifyIfAdmin, updateShipping);
router.delete("/:id", verifyIfAdmin, deleteShipping);



export { router as shippingRouter };