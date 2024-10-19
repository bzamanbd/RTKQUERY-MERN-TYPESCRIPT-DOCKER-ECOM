import { Router } from "express";
import { createOrder,myOrders,fetchOrders,fetchOrder,myOrderById,deleteOwnOrder,deleteOrder,updateOrderStatus,fetchOrderQRCode,markOrderAsViewed} from "./controllers";
import { isLoggedIn, isAdmin } from "../middlewares/auth"


const routes = Router()

routes.post('/new',isLoggedIn, createOrder)
routes.get('/',isLoggedIn, myOrders) 
routes.get('/all',isLoggedIn, isAdmin, fetchOrders) 
routes.get('/:id',isLoggedIn, isAdmin, fetchOrder)
routes.patch('/:id',isLoggedIn, isAdmin, markOrderAsViewed)
routes.get('/:id/qrcode', fetchOrderQRCode) 
routes.get('/own/:id',isLoggedIn, myOrderById) 
routes.delete('/own',isLoggedIn, deleteOwnOrder)
routes.delete('/:id',isLoggedIn, isAdmin, deleteOrder) 
routes.put('/:id',isLoggedIn, isAdmin, updateOrderStatus)


export default routes;
