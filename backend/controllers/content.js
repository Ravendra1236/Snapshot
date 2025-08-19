import { Content } from "../models/contentSchema.js";

export const contentSubmission = async (req, res) => {
  try {
    const { title, link, type } = req.body;
    const content = new Content({
      title,
      link,
      type,
      userId: req.userId,
      tags: [],
    });
    await content.save();
    return res.status(200).json({
      mssg: "Data successfully saved!",
    });
  } catch (error) {
    return res.status(500).json({
      mssg: "Something went wrong!",
      error: error,
    });
  }
};

export const getAllContents = async (req, res) => {
  try {
    const userId = req.userId;
    const content = await Content.find({ userId: userId }).populate(
      "userId",
      "username"
    );

    if (content) {
      return res.status(200).json({
        content,
      });
    }
  } catch (error) {
    return res.status(500).json({
      mssg: "Something went wrong!",
    });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const contentId = req.body.contentId;
    const data = await Content.findByIdAndDelete(contentId);

    return res.status(200).json({
      mssg: "Content Deleted Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      mssg: "Something went wrong!",
    });
  }
};
