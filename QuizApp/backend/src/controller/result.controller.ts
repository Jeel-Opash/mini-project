import type { Request, Response } from "express";
import { Result } from "../models/result.model.js";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const createResult = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            })
        }
        const { title, technology, level, totalQuestions, correct, wrong } = req.body;
        if (!technology || !level || totalQuestions === undefined || correct === undefined) {
            return res.status(400).json({
                success: false,
                message: "missing fields"
            });
        }

        const computedWrong = wrong !== undefined ? Number(wrong) : Math.max(0, Number(totalQuestions) - Number(correct));

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Missing Title"
            })
        }

        const payload = {
            title: String(title).trim(),
            technology, level, totalQuestions: Number(totalQuestions),
            correct: Number(correct),
            wrong: computedWrong,
            user: req.user.id
        }

        const created = await Result.create(payload);
        return res.status(201).json({
            success: true,
            message: 'Result Create',
            result: created
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            suceess: false,
            message: "create result api not work "
        })

    }
}




export async function listResults(req: Request, res: Response) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }

        const { technology } = req.query;

        const query: any = { user: req.user.id };

        if (technology && typeof technology === 'string' && technology.toLowerCase() !== 'all') {
            query.technology = technology;
        }


        const items = await Result.find(query).sort({ createdAt: -1 }).lean();
        return res.json({
            success: true,
            results: items
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            suceess: false,
            message: "list result api not work "
        })
    }
}