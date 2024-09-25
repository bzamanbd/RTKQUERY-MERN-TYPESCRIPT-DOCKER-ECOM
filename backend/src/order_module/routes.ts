import { Router } from "express";
import { createOrder,myOrders,fetchOrders,fetchOrder,deleteOwnOrder,deleteOrder,updateOrderStatus} from "./controllers";
import { isLoggedIn, isAdmin } from "../middlewares/auth"


const routes = Router()

routes.post('/new',isLoggedIn, createOrder)
routes.get('/',isLoggedIn, myOrders) 
routes.get('/all',isLoggedIn, isAdmin, fetchOrders) 
routes.get('/:id',isLoggedIn, isAdmin, fetchOrder) 
routes.delete('/own',isLoggedIn, deleteOwnOrder)
routes.delete('/:id',isLoggedIn, isAdmin, deleteOrder) 
routes.put('/:id',isLoggedIn, isAdmin, updateOrderStatus)


export default routes;
