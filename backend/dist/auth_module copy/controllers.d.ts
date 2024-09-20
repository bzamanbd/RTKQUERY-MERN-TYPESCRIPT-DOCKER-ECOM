import { Request, Response, NextFunction } from "express";
export declare const signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const signin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
