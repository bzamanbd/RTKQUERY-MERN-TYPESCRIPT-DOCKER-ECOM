import { Request, Response, NextFunction } from 'express';
declare const checkIfBlocked: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default checkIfBlocked;
