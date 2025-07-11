import express from "express";
import { deleteUser, getAllUsers, getUser, getUserByIdFromCookies, Signin, Signup, updateUser } from "../controllers/users.js";
import { verifyIfAdmin } from "../middleware/verifyIfAdmin.js";

const router = express.Router();
router.post("/signin", Signin);
router.post("/signup", Signup);
router.get("/me", getUserByIdFromCookies);
router.get("/:id", verifyIfAdmin, getUser);
router.get("/", verifyIfAdmin, getAllUsers);
router.delete("/:id", verifyIfAdmin, deleteUser);
router.put("/:id", verifyIfAdmin, updateUser);

export { router as userRouter };