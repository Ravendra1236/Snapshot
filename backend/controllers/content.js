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

const getAllContents = async (req, res) => {
  try {
    const data = await Content.find();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      mssg: "Something went wrong",
      error: error,
    });
  }
};

const deleteContent = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Content.findByIdAndDelete(id);
    if (!response) {
      res.status(400).json({
        mssg: "Content Not found.",
      });
    }
    res.status(400).json({
      mssg: "Successfully deleted.",
    });
  } catch (error) {
    res.status(500).json({
      mssg: "Something went wrong!",
      error: error,
    });
  }
};

export { contentSubmission, getAllContents, deleteContent };
