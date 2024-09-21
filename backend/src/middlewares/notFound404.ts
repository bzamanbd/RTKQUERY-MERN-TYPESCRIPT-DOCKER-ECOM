import { Request, Response, NextFunction } from 'express';

const notFound404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'False',
    message: `Route Not Found 404`
  });
};

export default notFound404;
