import express from "express"  
import appRes from "./utils/appRes"
import dotenv from 'dotenv'
dotenv.config()
import connectDb from "./config/connectDB" 
import globalErrorHandler from "./middlewares/globalErrorHandler"
import router from "./routes/index"

connectDb()

const app = express() 
const port = process.env.PORT || 9000

app.use(express.json(), router, globalErrorHandler)

app.get('/',(req,res)=>{ appRes(res,200,'','server health is fine',{})})

app.use('*',(req,res)=>{appRes(res,404,'False',`${req.originalUrl} <== Route not found`,{})})


app.listen(port,()=>console.log(`server runs on http://localhost:${port}`))