import type { Request, Response } from "express";
import type { IUser } from "../models/user.model.js";
interface AuthRequest extends Request {
    user?: IUser;
}
export declare const Register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const Login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUser: (req: AuthRequest, res: Response) => Promise<Response>;
export {};
//# sourceMappingURL=user.controller.d.ts.map