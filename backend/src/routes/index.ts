import { Router } from "express" 
import authRoutes from '../auth_module/routes'

const router = Router()

router.use("/api/v1/auth", authRoutes)

export default router