import type { Request, Response } from "express";
import { Result } from "../models/result.model.js";


/* =========================
   CREATE RESULT
========================= */
export const createResult = async (req: Request, res: Response) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const { title, technology, level, totalQuestions, correct, wrong } =
      req.body;

    if (
      !title ||
      !technology ||
      !level ||
      totalQuestions === undefined ||
      correct === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const total = Number(totalQuestions);
    const correctNum = Number(correct);

    if (isNaN(total) || isNaN(correctNum)) {
      return res.status(400).json({
        success: false,
        message: "Invalid number values",
      });
    }

    const computedWrong =
      wrong !== undefined
        ? Number(wrong)
        : Math.max(0, total - correctNum);

    const created = await Result.create({
      user: req.user._id,
      title: String(title).trim(),
      technology: String(technology).toLowerCase().trim(),
      level: String(level).toLowerCase().trim(),
      totalQuestions: total,
      correct: correctNum,
      wrong: computedWrong,
    });

    return res.status(201).json({
      success: true,
      message: "Result Created Successfully",
      result: created,
    });
  } catch (error: any) {
    console.error("Error in createResult:", error);
    return res.status(500).json({
      success: false,
      message: "Create result API failed",
      error: error.message || String(error),
    });
  }
};

/* =========================
   LIST RESULTS
========================= */
export const listResults = async (req: Request, res: Response) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const { technology } = req.query;

    const query: any = {
      user: req.user._id,
    };

    if (
      technology &&
      typeof technology === "string" &&
      technology.toLowerCase() !== "all"
    ) {
      query.technology = technology.toLowerCase();
    }

    const items = await Result.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      results: items,
    });
  } catch (error) {
    console.error("Error in listResults:", error);
    return res.status(500).json({
      success: false,
      message: "List result API failed",
    });
  }
};