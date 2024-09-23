import {Router} from "express"
import {
    createProduct,
    fetchProducts,
    fetchProductsWithFilter,
    fetchLatestProduct,
    fetchProductById,
    editProduct,
    deleteProduct,
    getCategories
} from "./controllers.js"
import { isAdmin, isLoggedIn } from "../middlewares/auth"
import mediaUploader from '../middlewares/mediaUploader'


const routes = Router()

const productMediaUploader =  mediaUploader.fields([{name:'photos',maxCount:3},{name:'videos',maxCount:1}])

routes.post("/new",isLoggedIn,isAdmin,productMediaUploader,createProduct)
routes.get("/",fetchProducts)
routes.get("/all",fetchProductsWithFilter)
routes.get("/latest",fetchLatestProduct)
routes.get("/:id",fetchProductById)
routes.get("/categories",getCategories)
routes.put("/:id",isLoggedIn,isAdmin,productMediaUploader,editProduct)
routes.delete("/:id",isLoggedIn,deleteProduct)

export default routes