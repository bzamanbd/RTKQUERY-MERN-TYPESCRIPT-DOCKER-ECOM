import express,{Request,Response} from 'express';
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

const app = express() 
const port = process.env.PORT || 9000
const stripeKey = process.env.STRIPE_KEY || ""
connectDb();
app.use(cors());
export const stripe = new Stripe(stripeKey);
app.use(express.json(),router);
app.use('/public', express.static(path.join(process.cwd(), 'public')))
app.get('/',(req:Request,res:Response)=>{ appRes(res,200,'','server health is fine',{})})
app.use(notFound404,globalErrorHandler)
app.listen(port,()=>console.log(`server runs on http://localhost:${port}`))