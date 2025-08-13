import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  contentSubmission,
  deleteContent,
  getAllContents,
} from "../controllers/content.js";
const router = express.Router();

router.post("/", authMiddleware, contentSubmission);
router.get("/", authMiddleware, getAllContents);
router.delete("/", authMiddleware, deleteContent);

const contentRouter = router;
export default contentRouter;
