import 'dotenv/config';
import { Request, Response, NextFunction } from "express";
export declare const createPaymentIntent: (req: Request, res: Response, next: NextFunction) => void;
export declare const newCoupon: (req: Request, res: Response, next: NextFunction) => void;
export declare const applyDiscount: (req: Request, res: Response, next: NextFunction) => void;
export declare const allCoupons: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteCoupon: (req: Request, res: Response, next: NextFunction) => void;
