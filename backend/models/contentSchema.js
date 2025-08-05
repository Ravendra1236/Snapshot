import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }], 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
});

export const Content = mongoose.model("Content", contentSchema);
