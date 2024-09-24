import { Request, Response, NextFunction } from "express";
export declare const fetchOrders: (req: Request, res: Response, next: NextFunction) => void;
export declare const createOrder: (req: Request, res: Response, next: NextFunction) => void;
export declare const fetchOrder: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteOrder: (req: Request, res: Response, next: NextFunction) => void;
export declare const processOrder: (req: Request, res: Response, next: NextFunction) => void;
