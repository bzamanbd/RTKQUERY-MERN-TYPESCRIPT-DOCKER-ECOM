import {Router} from "express"
import {createPaymentIntent,newCoupon,applyDiscount,allCoupons,deleteCoupon} from "./controllers.js"
import { isAdmin, isLoggedIn } from "../middlewares/auth.js"


const routes = Router()

routes.post("/payment", isLoggedIn,createPaymentIntent)
routes.post("/new",isLoggedIn, isAdmin, newCoupon)
routes.get("/discount",isLoggedIn,applyDiscount)
routes.get("/all",isLoggedIn, isAdmin, allCoupons)
routes.delete("/:id",isLoggedIn, isAdmin, deleteCoupon)

export default routes