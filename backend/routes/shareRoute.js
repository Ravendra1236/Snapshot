import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getContentShareLinkId,
  shareLinkGenerator,
} from "../controllers/share.js";
const router = express.Router();

router.post("/share", authMiddleware, shareLinkGenerator);
router.post("/share/:shareLink", authMiddleware, getContentShareLinkId);
const shareRouter = router;
export default shareRouter;
