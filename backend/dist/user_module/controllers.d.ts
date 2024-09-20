import 'dotenv/config';
import { Request, Response, NextFunction } from "express";
export declare const fetchUsers: (req: Request, res: Response, next: NextFunction) => void;
export declare const fetchProfile: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const fetchQuestion: (req: Request, res: Response, next: NextFunction) => void;
export declare const resetPassword: (req: Request, res: Response, next: NextFunction) => void;
export declare const updatePassword: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteOwnAccount: (req: Request, res: Response, next: NextFunction) => void;
