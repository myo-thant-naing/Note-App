import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/user";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;