import {Router} from "express"
import {
    createProduct,
    fetchProducts,
    fetchProductsCats,
    fetchProductsWithFilter,
    fetchLatestProduct,
    fetchProductById,
    editProduct,
    deleteProduct
} from "./controllers.js"
import { isAdmin, isLoggedIn } from "../middlewares/auth"
import mediaUploader from '../middlewares/mediaUploader'


const routes = Router()

const productMediaUploader =  mediaUploader.fields([{name:'photos',maxCount:3},{name:'videos',maxCount:1}])

routes.post("/new",isLoggedIn,isAdmin,productMediaUploader,createProduct)
routes.get("/",fetchProducts)
routes.get("/cats",fetchProductsCats)
routes.get("/all",fetchProductsWithFilter)
routes.get("/latest",fetchLatestProduct)
routes.get("/:id",fetchProductById)
routes.put("/:id",isLoggedIn,isAdmin,productMediaUploader,editProduct)
routes.delete("/:id",isLoggedIn,deleteProduct)

export default routes