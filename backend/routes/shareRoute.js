import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getContentShareLinkId,
  shareLinkGenerator,
} from "../controllers/share.js";
const router = express.Router();

router.post("/share", authMiddleware, shareLinkGenerator);
router.get("/share/:shareLink", getContentShareLinkId);
const shareRouter = router;
export default shareRouter;
