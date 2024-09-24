import { Router } from "express";
import { createOrder,fetchOrders,fetchOrder,processOrder,deleteOrder } from "./controllers";
import { isLoggedIn, isAdmin } from "../middlewares/auth"


const routes = Router()

routes.post('/',isLoggedIn, createOrder)
routes.get('/',isLoggedIn, isAdmin, fetchOrders) 
routes.get('/:id',isLoggedIn, isAdmin, fetchOrder) 
routes.post('/:id',isLoggedIn, isAdmin, processOrder) 
routes.delete('/:id',isLoggedIn, isAdmin, deleteOrder) 


export default routes;
