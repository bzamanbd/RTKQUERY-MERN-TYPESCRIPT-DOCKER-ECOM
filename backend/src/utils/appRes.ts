import { Response } from "express";
const appRes = (res:Response, status:number, success:string, message:string, data: {} | null = null) => {
    res.status(status).json({
      success: success || 'True',
      message: message,
      data: data
    });
  };
export default appRes;  