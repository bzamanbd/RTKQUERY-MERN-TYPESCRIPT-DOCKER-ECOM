import { Request, Response, NextFunction } from "express";
export declare const createOrder: (req: Request, res: Response, next: NextFunction) => void;
export declare const fetchOrders: (req: Request, res: Response, next: NextFunction) => void;
export declare const fetchOrder: (req: Request, res: Response, next: NextFunction) => void;
export declare const myOrders: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteOrder: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteOwnOrder: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateOrderStatus: (req: Request, res: Response, next: NextFunction) => void;
