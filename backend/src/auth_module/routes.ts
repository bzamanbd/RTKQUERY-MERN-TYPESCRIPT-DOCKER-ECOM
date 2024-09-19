import {Router} from "express"
import {signup,signin} from "./controllers"
import rateLimiter from "../utils/rateLimiter"
import imageUploader from "../middlewares/imageUploader";

const routes = Router() 

const avatarUploader = imageUploader('avatar');

routes.post("/signup", rateLimiter, avatarUploader, signup)

routes.post("/signin",signin)


export default routes