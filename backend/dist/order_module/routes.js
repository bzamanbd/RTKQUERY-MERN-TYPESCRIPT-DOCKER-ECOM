"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const auth_1 = require("../middlewares/auth");
const routes = (0, express_1.Router)();
routes.post('/new', auth_1.isLoggedIn, controllers_1.createOrder);
routes.get('/', auth_1.isLoggedIn, controllers_1.myOrders);
routes.get('/all', auth_1.isLoggedIn, auth_1.isAdmin, controllers_1.fetchOrders);
routes.get('/:id', auth_1.isLoggedIn, auth_1.isAdmin, controllers_1.fetchOrder);
routes.get('/:id/qrcode', controllers_1.fetchOrderQRCode);
routes.get('/own/:id', auth_1.isLoggedIn, controllers_1.myOrderById);
routes.delete('/own', auth_1.isLoggedIn, controllers_1.deleteOwnOrder);
routes.delete('/:id', auth_1.isLoggedIn, auth_1.isAdmin, controllers_1.deleteOrder);
routes.put('/:id', auth_1.isLoggedIn, auth_1.isAdmin, controllers_1.updateOrderStatus);
exports.default = routes;
