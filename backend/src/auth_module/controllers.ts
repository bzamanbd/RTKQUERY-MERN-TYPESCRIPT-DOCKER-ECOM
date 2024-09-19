import {Request, Response, NextFunction } from "express"
import appErr from "../utils/appErr"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import appRes from "../utils/appRes"
import userModel from '../models/user_model'
import adminEmails from "../utils/adminEmails"
import isValidEmail from '../utils/isValidEmail';
import path from 'path';
import { deleteFile, processImage } from "../utils/imageProcessor"




export const signup = async(req:Request, res:Response,next:NextFunction)=>{ 
    
    const payload = req.body
    
    if(!payload.name || !payload.email || !payload.password || !payload.phone || !payload.question || !payload.answer) return next(appErr('name,email,password,phone,question and answer are required',400)) 
    
    if(!isValidEmail(payload.email))return next(appErr('Invalid email format',400))
    
    try { 
        const emailExists = await userModel.findOne({email: payload.email})

        if (emailExists){
            if(req.file){ 
                deleteFile(path.join('./temp', req.file.filename))
            }
            return next(appErr(`${payload.email} email is exists. Try another`,401))
        }
        
        if(payload.role === 'admin' && !adminEmails.includes(payload.email))return next(appErr('You are not authorized to create an admin account',403))
        
        const hashedPass = await bcrypt.hash(payload.password, 10) 
        const hashedAnswer = await bcrypt.hash(payload.answer, 10) 
        
        const email = payload.email;
        const getRole = (email:string) => adminEmails.includes(email) ? 'admin' : payload.role

        payload.password = hashedPass;
        payload.answer = hashedAnswer;
        payload.role = getRole(email); 

        const user = new userModel(payload)
        
        await user.save();
        
        if(user && req.file){ 
            const filename = await processImage({ 
                inputPath: path.join('./temp',req.file.filename),
                outputDir: './public/avatars',
                imgWidth: 100,
                imgQuality: 80
            })

            user.avatar = path.join('./public/avatars', filename);
            await user.save();

            // Clean up temporary file after processing
            deleteFile(path.join('./temp', req.file.filename));
        }

        user.password = undefined
        user.answer = undefined
        appRes(res,201,'','Registration success',{user})

    } catch (e:any) {
        if (req.file) {
            deleteFile(path.join('./temp', req.file.filename)); // Clean up on error
        }
        return next(appErr(e.message,500))
    }

}

export const signin = async(req:Request,res:Response, next:NextFunction)=>{ 
    const {email,password} = req.body
    if(!email || !password) return next(appErr('email and password are required',400))
    if(!isValidEmail(email))return next(appErr('Invalid email format',400)) 
    try {
        const user = await userModel.findOne({email})

        const isMatch = await bcrypt.compare(password, user&& user.password)
        
        if(!isMatch)return next(appErr('Invalid Credentials',401)) 
        

        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            return res.status(500).json({ error: 'Secret key is not defined' });
          }

        const options: jwt.SignOptions = {
            expiresIn: '1h', 
            algorithm: 'HS256',
          };

        const tocken = jwt.sign({id: user&& user._id},secretKey,options) 

        appRes(res,200,'','Login success!',{tocken})
    } catch (e:any) {
        return next(appErr(e.message,500))
    } 

}