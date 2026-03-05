import type { Request, Response } from "express";
import type { IUser } from "../models/user.model.js";
interface AuthRequest extends Request {
    user?: IUser;
}
export declare const addTravel: (req: AuthRequest, res: Response) => Promise<Response>;
export declare const getTravel: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=travel.controller.d.ts.map