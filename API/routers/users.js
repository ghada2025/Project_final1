import express from "express";
import { deleteUser, getAllUsers, getUser, getUserById, getUserByIdFromCookies, Signin, Signup, updateUser } from "../controllers/users.js";
import { verifyIfAdmin } from "../middleware/verifyIfAdmin.js";

const router = express.Router();
router.post("/signin", Signin);
router.post("/signup", Signup);
router.get("/me", getUserByIdFromCookies);
router.get("/me/:id", getUserById);
router.get("/:id", getUser);
router.get("/", getAllUsers);
router.delete("/:id", verifyIfAdmin, deleteUser);
router.put("/:id", verifyIfAdmin, updateUser);
// GET   / -> get one user 
// DELETE /:id + verify first if admin
// UPDATE /:id + verify first if admin

export { router as userRouter };