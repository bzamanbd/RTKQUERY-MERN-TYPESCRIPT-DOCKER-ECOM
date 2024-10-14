import {Router} from "express"
import {register,login} from "./controllers"
import rateLimiter from "../utils/rateLimiter"
import imageUploader from "../middlewares/imageUploader";

const routes = Router() 

const avatarUploader = imageUploader('avatar');

routes.post("/register", rateLimiter, avatarUploader, register)

routes.post("/login",login)


export default routes