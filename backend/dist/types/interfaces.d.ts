import { Request, Response, NextFunction } from "express";
export interface IXprops {
    req: Request | any;
    res: Response;
    next: NextFunction;
}
