import { Request, Response, NextFunction } from "express";
interface HttpError extends Error {
    status?: string;
    statusCode?: number;
}
declare const globalErrorHandler: (err: HttpError, req: Request, res: Response, next: NextFunction) => void;
export default globalErrorHandler;
