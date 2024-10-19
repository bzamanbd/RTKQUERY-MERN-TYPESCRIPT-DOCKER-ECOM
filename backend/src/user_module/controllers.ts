import appErr from "../utils/appErr"
import bcrypt from "bcryptjs"
import 'dotenv/config'
import appRes from "../utils/appRes"
import {User} from '../models/user'
import path from "path"
import { processImage, deleteFile } from '../utils/imageProcessor';
import { oldImageRemover } from "../utils/oldImageRemover" 
import { Request, Response, NextFunction } from "express"
import TryCatch from "../middlewares/tryCatch"

export const fetchUsers = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const search = req.query.search || "" 
        const page = Number(req.query.page || 1)
        const limit = Number(req.query.limit || 5)
        const searchRexExp = new RegExp('.*' + search + '.*', 'i')
        const filter = { 
            $or:[ {name:{$regex:searchRexExp}},
                {email:{$regex:searchRexExp}},
                {phone:{$regex:searchRexExp}}
            ]
        }
        const option = {password:0}
        const users = await User.find(filter, option).limit(limit).skip((page-1)*5)
        const count = await User.find(filter).countDocuments()
        if(users.length <1)return appRes(res,200,'',`${users.length} user found!`,{users})
        // users.forEach(user =>user.password = undefined)    
        appRes(res,200,'',`${users.length} users found!`,{
            users,
            pagination:{ 
                totalUsers:count,
                totalPages:Math.ceil(count/limit),
                currentPage:page, 
                prevPage:(page-1)>0? (page-1) : null,
                nextPage:(page+1)<= Math.ceil(count/limit)? page+1 :null,

            }
        })
    }
)

export const fetchUser = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const id = req.params.id
        if(!id) return next(appErr('id is required',400))
        const user = await User.findById({_id: id})
        if (!user) return next(appErr('User not found!',404))
        user.password = undefined
        appRes(res,200,'',`${user.name}'s profile`,{user})
    }
)

export const updateUser = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const _id = req.params.id 
        const payload = req.body
        const existUser = await User.findById(_id) 
        if(!existUser && req.file)return next(appErr('user not found',404));
        const user = await User.findByIdAndUpdate(
            _id,
            {$set:payload},
            {new:true, runValidators:true}
        ) 
        if(!user)return next(appErr('user did not updated, something went wrong!',500))
        appRes(res,200,'','User is updated successfully!',{user})
    }
)


export const blockUser = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const _id = req.params.id 
        const payload = req.body
        const existUser = await User.findById(_id) 
        if(!existUser)return next(appErr('user not found',404));
        const user = await User.findByIdAndUpdate(
            _id,
            {$set:payload},
            {new:true, runValidators:true}
        ) 
        if(!user)return next(appErr('user did not updated, something went wrong!',500))
        if(user.isBanned) return appRes(res,200,'',`User's account is blocked successfully`,{user})
        appRes(res,200,'',`User's account is unblocked successfully`,{user})
    }
)

export const deleteUser = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const id = req.params.id
        if(!id)return next(appErr('id is required',400)) 
        const user = await User.findById({_id:id})
        if(!user)return next(appErr('User not found!',404))
        await User.findByIdAndDelete({_id:id})
        appRes(res,200,'','Account is deleted successfully!',{})
    }
)

export const fetchProfile = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const _id = req.user?.id;
        if(!_id) return next(appErr('_id is required',400))
        const user = await User.findById(_id)
        if (!user) return next(appErr('User not found!',404))
        user.password = undefined
        appRes(res,200,'',`${user.name}'s profile`,{user})
    }
)

export const updateProfile = TryCatch(
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const _id = req.user?.id;
        const payload = req.body;
        const existUser = await User.findById(_id);
        // No one can change the predefined admin emails
        if(existUser){
            if(existUser.role === 'admin' && payload.email){
                if(req.file){deleteFile(path.join('./temp', req.file.filename))};
                return next(appErr(`You don't have permission to change the pre-defined admin email`,400))
            }
        }
        if(existUser && req.file){ 
            // Delete the old avatar from db
            oldImageRemover({existImage:existUser.avatar})
            const filename = await processImage({ 
                inputPath: path.join('./temp', req.file.filename),
                outputDir: './public/avatars',
                imgWidth: 100,
                imgQuality: 80
            });
            payload.avatar = path.join('./public/avatars', filename);
            // Clean up temporary file after processing
            deleteFile(path.join('./temp', req.file.filename));
        }
        try {
        const user = await User.findByIdAndUpdate(
            _id,
            {$set:payload},
            {new:true, runValidators:true}
        );
        if(!user && req.file){
            // Clean up temporary file after processing
            deleteFile(path.join('./temp', req.file.filename));
            return next(appErr('Profile is not updated',400))
        };
        appRes(res,200,'','Profile update success!',{user});
        } catch (e:any) {
            if (req.file) {
                deleteFile(path.join('./temp', req.file.filename)); // Clean up on error
            }
            return next(appErr(e.message,500))
        } 
    }
)

export const fetchQuestion = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const {email} = req.body
        if(!email)return next(appErr('email is required',400))
        const user = await User.findOne({email})
        if (!user) return next(appErr('User not found!',404))
        const question = user.question  
        appRes(res,200,'',`${user.name}'s question`,{question})
    }
)

export const resetPassword = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const {email,newPassword,answer} = req.body
        if(!email || !newPassword || !answer) return next(appErr('email,newPassword and answer are required',400)) 
        const user = await User.findOne({email})
        if(!user)return next(appErr('User not found!',404)) 
        const isMatchAnswer = await bcrypt.compare(answer, user.answer!);
        if(!isMatchAnswer) return next(appErr('Invalid answer',400))
        const hashedAnswer = await bcrypt.hash(answer,10)
        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.answer = hashedAnswer
        user.password = hashedPassword
        await user.save()
        user.password = undefined
        appRes(res,200,'','Password reset success!',{user})
    }
)

export const updatePassword = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const id = req.user?.id
        const {oldPassword,newPassword} = req.body 
        if(!oldPassword || !newPassword) return next(appErr('oldPassword and newPassword are required',400)) 
        const user = await User.findById({_id:id})
        if(!user)return next(appErr('User not found!',404)) 
        const isMatchOldPassword = await bcrypt.compare(oldPassword, user.password!);
        if(!isMatchOldPassword) return next(appErr('Invalid old password',400))
        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.password = hashedPassword
        await user.save()
        user.password = undefined
        appRes(res,200,'','Password update success!',{user})
    
    }
)

export const deleteOwnAccount = TryCatch( 
    async(req:Request, res:Response, next:NextFunction)=>{ 
        const id = req.user?.id
        if(!id)return next(appErr('id is required',400)) 
        const user = await User.findById({_id:id})
        if(!user)return next(appErr('User not found!',404))
        await User.findByIdAndDelete({_id:id})
        appRes(res,200,'','Your account is deleted successfully!',{})
    }
)


