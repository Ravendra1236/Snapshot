import express from "express";
import { Content } from "../models/contentSchema.js";

const contentSubmission = async (req, res) => {
  try {
    const { title, link, type } = req.body;
    const content = new Content({
      title,
      link,
      type,
    });
    await content.save();
    res.status(200).json({
      mssg: "Data successfully saved!",
    });
  } catch (error) {
    res.status(500).json({
      mssg: "Something went wrong!",
      error: error,
    });
  }
};

export default contentSubmission;
