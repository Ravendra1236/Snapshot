import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import contentSubmission from "../controllers/content.js";
const router = express.Router();

router.post("/", authMiddleware, contentSubmission);

const contentRouter = router;
export default contentRouter;
