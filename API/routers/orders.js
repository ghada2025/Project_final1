import express from "express";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/orders.js";
import { verifyIfAdmin } from "../middleware/verifyIfAdmin.js";


const router = express.Router();
// GET ALL ORDERS + verify if admin
router.get("/", verifyIfAdmin, getOrders);
router.post("/", createOrder); // change confirm order to createOrder -> create a order with state pending
router.put("/", verifyIfAdmin, updateOrder); // verify if admin + change the state based on the state in body
router.delete("/", verifyIfAdmin, deleteOrder);

export { router as orderRouter };