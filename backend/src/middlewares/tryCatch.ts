import { Request, Response, NextFunction } from 'express';

const TryCatch = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Call the route handler and catch any errors
    fn(req, res, next).catch(next);
  };
};

export default TryCatch;
