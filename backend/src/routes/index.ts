import { Router } from "express" 
import authRoutes from '../auth_module/routes'
import userRoutes from '../user_module/routes'
import productRoutes from '../product_module/routes'

const router = Router()

router.use("/api/v1/auth", authRoutes)
router.use("/api/v1/users", userRoutes)
router.use("/api/v1/products", productRoutes)

export default router