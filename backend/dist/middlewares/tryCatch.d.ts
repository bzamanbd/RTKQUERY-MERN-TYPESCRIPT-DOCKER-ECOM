import { Request, Response, NextFunction } from 'express';
declare const TryCatch: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => void;
export default TryCatch;
