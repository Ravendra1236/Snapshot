import express from "express";
import dotenv from "dotenv";
import "./lib/db.js";

import userRouter from "./routes/userRoute.js";
import contentRouter from "./routes/contentRoute.js";
import shareRouter from "./routes/shareRoute.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 4000;

app.use("/api/v1", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1", shareRouter);

app.listen(port, () => {
  console.log(`Server is started on: ${port}`);
});
