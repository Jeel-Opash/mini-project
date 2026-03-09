import { Request, Response } from "express";
export declare const addTravel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTravel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editTravel: (req: Request, res: Response) => Promise<Response>;
export declare const deleteTravel: (req: Request, res: Response) => Promise<Response>;
export declare const favTravel: (req: Request, res: Response) => Promise<Response>;
export declare const search: (req: Request, res: Response) => Promise<Response>;
export declare const filter: (req: Request, res: Response) => Promise<Response>;
//# sourceMappingURL=travel.controller.d.ts.map