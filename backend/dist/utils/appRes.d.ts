import { Response } from 'express';
declare const appRes: (res: Response, status: number, success: string, message: string, data?: {} | null) => void;
export default appRes;
