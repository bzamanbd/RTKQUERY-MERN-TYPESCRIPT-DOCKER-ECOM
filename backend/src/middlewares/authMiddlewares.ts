import userModel,{IUser} from '../models/user_model'
import "dotenv/config"
import jwt,{JwtPayload} from "jsonwebtoken"
import appErr from "../utils/appErr";
import { Request, Response, NextFunction } from 'express';


export const isLoggedIn = async (req:Request, res:Response, next:NextFunction) => {

  const authHeader = req.headers.authorization;
    
  if (!authHeader) return next(appErr('No token provided',401))

  const token = authHeader.split(' ')[1];
      
  if (!token) return next(appErr('Unauthorized',401)) 
 
  try {
  
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await userModel.findById({_id:(payload as JwtPayload).id}) as IUser
    
    // console.log(user);
    
    if (!user) return next(appErr('Unauthorized',401))

    req.user = user

    next();

  } catch (e) {
    return next(appErr('Tocken is expired or incorrect',498))
  }
  }

  export const isAdmin = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const role = req.user?.role    
      if (role !== 'admin')return next(appErr('Unauthorized access',401))
      next(); 
    } catch (e:any) {
      return next(appErr(e.message,500))
    }
  }