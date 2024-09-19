import {Request, Response, NextFunction } from "express"

interface HttpError extends Error {
    status?: string,
    statusCode?: number
  }

const globalErrorHandler =(err:HttpError, req:Request, res:Response, next:NextFunction)=>{
    const status = err.status || "False"
    const message = err.message
    const stack = err.stack
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ status,message,stack })
 }

 export default globalErrorHandler