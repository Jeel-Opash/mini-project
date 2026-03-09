import { Request, Response } from "express";
import Travel from "../models/travel.model.js";

export const addTravel = async (req: Request, res: Response) => {
  try {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const userId = req.user?._id;

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const travel = new Travel({
      title,
      story,
      visitedLocation,
      imageUrl,
      visitedDate,
      userId,
      isFavourite: false,
      createdOn: new Date()
    });

    const savedTravel = await travel.save();

    return res.status(201).json({ success: true, data: savedTravel });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getTravel = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const travelstories = await Travel.find({ userId }).sort({
      isFavourite: -1,
      createdOn: -1
    });

    return res.status(200).json({ success: true, stories: travelstories });
  } catch {
    return res.status(500).json({ success: false, message: "get api not work" });
  }
};

export const editTravel = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;

  const userId = req.user?._id;

  if (!title || !story || !visitedLocation || !visitedDate) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  let parsedVisitedDate: Date;
  if (!visitedDate) {
    parsedVisitedDate = new Date();
  } else if (visitedDate instanceof Date) {
    parsedVisitedDate = visitedDate;
  } else {
    const timestamp = Number(visitedDate);
    parsedVisitedDate = isNaN(timestamp) ? new Date(visitedDate) : new Date(timestamp);
  }

  // Final check for Invalid Date
  if (isNaN(parsedVisitedDate.getTime())) {
    parsedVisitedDate = new Date();
  }

  try {
    const travelStory = await Travel.findOne({
      _id: id,
      userId: userId,
    });

    if (!travelStory) {
      return res.status(404).json({
        success: false,
        message: "Travel story not found",
      });
    }

    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageUrl = imageUrl;
    travelStory.visitedDate = parsedVisitedDate;

    await travelStory.save();

    return res.status(200).json({
      success: true,
      story: travelStory,
      message: "Update Successful",
    });
  } catch (err) {
    console.error("editTravel error:", err);
    return res.status(500).json({
      success: false,
      message: "editTravel API not working",
    });
  }
};

export const deleteTravel = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const travelStory = await Travel.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!travelStory) {
      return res.status(404).json({
        success: false,
        message: "Travel story not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Travel story deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "deleteTravel API not working",
    });
  }
};

export const favTravel = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { isFavourite } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  try {
    const travelStory = await Travel.findOne({ _id: id, userId });

    if (!travelStory) {
      return res.status(404).json({
        success: false,
        message: "Travel story not found"
      });
    }

    travelStory.isFavourite = isFavourite;
    await travelStory.save();

    return res.status(200).json({
      success: true,
      message: "Update success",
      story: travelStory
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "favTravel API not working"
    });
  }
};


export const search = async (req: Request, res: Response): Promise<Response> => {
  const { query } = req.query;
  const userId = req.user?._id;

  if (!query || typeof query !== "string") {
    return res.status(400).json({
      success: false,
      message: "query is required"
    });
  }

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  try {
    const searchResult = await Travel.find({
      userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { story: { $regex: query, $options: "i" } },
        { visitedLocation: { $regex: query, $options: "i" } }
      ]
    }).sort({ isFavourite: -1 });

    return res.status(200).json({
      success: true,
      stories: searchResult
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "filter API not working"
    });
  }
};




export const filter = async (req: Request, res: Response): Promise<Response> => {
  const { startDate, endDate } = req.query as { startDate: string; endDate: string };
  const userId = req.user?._id;

  try {
    if (!startDate || !endDate) {
      const allStories = await Travel.find({ userId }).sort({ isFavourite: -1, createdOn: -1 });
      return res.status(200).json({
        success: true,
        message: "All stories returned (no date filter provided)",
        data: allStories
      });
    }

    const filteredStories = await Travel.find({
      userId: userId,
      visitedDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).sort({ isFavourite: -1 });

    return res.status(200).json({
      success: true,
      message: "filter api success",
      data: filteredStories
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "filter API not working"
    });
  }
};