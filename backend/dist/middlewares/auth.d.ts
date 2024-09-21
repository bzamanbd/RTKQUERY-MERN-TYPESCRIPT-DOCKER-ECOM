import "dotenv/config";
import { Request, Response, NextFunction } from 'express';
export declare const isLoggedIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const isAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
