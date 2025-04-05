import express from "express";
import { verifyIfAdmin } from "../middleware/verifyIfAdmin.js";
import { alldiscount, creatediscount } from "../controllers/discount.js";

const router = express.Router();

router.get("/",verifyIfAdmin, alldiscount);
router.post("/", verifyIfAdmin, creatediscount);
router.put("/", verifyIfAdmin, updatediscount);
router.delete("/", verifyIfAdmin, deletediscount);


export { router as discountRouter };

// GET / ALL DISCOUNT + verify if admin
// POST / CREATE ONE DISCOUNT + verify if admin
// PUT / edit one discount + verify if admin 
// DELETE / delete one discount + verify if admin