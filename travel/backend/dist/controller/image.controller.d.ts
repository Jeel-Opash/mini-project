import type { Request, Response } from "express";
import type { IUser } from "../models/user.model.js";
interface AuthRequest extends Request {
    user?: IUser;
    file?: Express.Multer.File;
}
export declare const imageUpload: (req: AuthRequest, res: Response) => Promise<Response>;
export declare const imageDelete: (req: AuthRequest, res: Response) => Promise<Response>;
export {};
//# sourceMappingURL=image.controller.d.ts.map