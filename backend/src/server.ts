import express from "express"  
import dotenv from 'dotenv'
import appRes from "./utils/appRes"
dotenv.config()
import connectDb from "./config/connectDB" 

connectDb()

const app = express() 
const port = process.env.PORT || 9000

app.use(express.json())
app.get('/',(req,res)=>{ appRes(res,200,'','server health is fine',{})})

app.use('*',(req,res)=>{appRes(res,404,'False',`${req.originalUrl} <== Route not found`,{})})


app.listen(port,()=>console.log(`server runs on http://localhost:${port}`))