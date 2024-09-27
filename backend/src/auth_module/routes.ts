import {Router} from "express"
import {signup,login} from "./controllers"
import rateLimiter from "../utils/rateLimiter"
import imageUploader from "../middlewares/imageUploader";

const routes = Router() 

const avatarUploader = imageUploader('avatar');

routes.post("/signup", rateLimiter, avatarUploader, signup)

routes.post("/login",login)


export default routes