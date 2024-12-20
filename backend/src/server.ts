import express,{NextFunction, Request,Response} from 'express';
import appRes from "./utils/appRes"
import dotenv from 'dotenv'
dotenv.config()
import connectDb from "./config/connectDB" 
import globalErrorHandler from "./middlewares/globalErrorHandler"
import router from "./routes/index"
import notFound404 from './middlewares/notFound404';
import path from 'path';
import Stripe from 'stripe';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';

const app = express()
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { 
    cors:{ 
        origin: "http://localhost:5173", // Your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // Clean up on disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
});

// Middleware to attach `io` to the request
app.use((req: Request, res: Response, next: NextFunction) => {
    req.io = io;
    next();
});
const port = process.env.PORT || 9000
const stripeKey = process.env.STRIPE_KEY || ""
connectDb();
export const stripe = new Stripe(stripeKey);
app.use(express.json(),router);
app.use('/public', express.static(path.join(process.cwd(), 'public')))
app.get('/',(req:Request,res:Response)=>{ appRes(res,200,'','server health is fine',{})})
app.use(notFound404,globalErrorHandler)
app.listen(port,()=>console.log(`server runs on http://localhost:${port}`))