import express from "express";
import dotenv from "dotenv";
import db from "./lib/db.js";

import userRouter from "./routes/userRoute.js";
import contentRouter from "./routes/contentRoute.js";
import shareRouter from "./routes/shareRoute.js";

const app = express();

app.use(express.json());

dotenv.config();

const port = process.env.PORT || 4000;

app.use("/api/v1", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1", shareRouter);

app.listen(port, () => {
  console.log(`Server is started on: ${port}`);
});
