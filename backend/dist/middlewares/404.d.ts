import { Request, Response, NextFunction } from 'express';
declare const notFoundMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default notFoundMiddleware;
