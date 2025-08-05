import express from "express";
import { signUp, signIn } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

const userRouter = router;
export default userRouter;
