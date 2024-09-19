import { Request, Response, NextFunction } from 'express';
declare function imageUploader(keyName: any): (req: Request, res: Response, next: NextFunction) => void;
export default imageUploader;
