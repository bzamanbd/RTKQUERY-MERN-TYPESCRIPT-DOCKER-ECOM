import {Router} from "express"
import {
    fetchUsers,
    fetchUser,
    updateUser,
    deleteUser,
    fetchProfile,
    updateProfile,
    fetchQuestion,
    resetPassword,
    updatePassword,
    deleteOwnAccount,
    blockUser
} from "./controllers"
import { isAdmin, isLoggedIn } from "../middlewares/auth"
import imageUploader from '../middlewares/imageUploader';


const routes = Router() 

const avatarUploader = imageUploader('avatar');

routes.get("/", isLoggedIn, isAdmin, fetchUsers)
routes.get("/:id", isLoggedIn, isAdmin, fetchUser)
routes.put("/:id", isLoggedIn, isAdmin, updateUser)
routes.patch("/:id/block", isLoggedIn, isAdmin, blockUser)
routes.delete("/:id", isLoggedIn, isAdmin, deleteUser)
routes.get("/user/profile", isLoggedIn, fetchProfile)
routes.put("/user/update", isLoggedIn, avatarUploader, updateProfile)
routes.get("/user/question",  fetchQuestion)
routes.post("/user/reset-password",resetPassword)
routes.post("/user/update-password",isLoggedIn,updatePassword)
routes.delete("/user/delete-account",isLoggedIn,deleteOwnAccount)


export default routes