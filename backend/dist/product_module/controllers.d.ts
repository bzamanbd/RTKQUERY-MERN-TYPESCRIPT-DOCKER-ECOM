import 'dotenv/config';
import { Request, Response, NextFunction } from "express";
export declare const createProduct: (req: Request, res: Response, next: NextFunction) => void;
export declare const fetchProducts: (req: Request, res: Response, next: NextFunction) => void;
export declare const fetchLatestProduct: (req: Request, res: Response, next: NextFunction) => void;
export declare const fetchProductById: (req: Request, res: Response, next: NextFunction) => void;
export declare const editProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteProduct: (req: Request, res: Response, next: NextFunction) => void;
export declare const getCategories: (req: Request, res: Response) => Promise<void>;