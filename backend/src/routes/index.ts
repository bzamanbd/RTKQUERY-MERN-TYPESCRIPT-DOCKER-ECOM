import { Router } from "express" 
import authRoutes from '../auth_module/routes'
import userRoutes from '../user_module/routes'

const router = Router()

router.use("/api/v1/auth", authRoutes)
router.use("/api/v1/users", userRoutes)

export default router