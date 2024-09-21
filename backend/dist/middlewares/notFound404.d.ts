import { Request, Response, NextFunction } from 'express';
declare const notFound404: (req: Request, res: Response, next: NextFunction) => void;
export default notFound404;
