import express from "express"  
import dotenv from 'dotenv'
dotenv.config()

const app = express() 
const port = process.env.PORT || 9000
app.listen(port,()=>console.log(`server runs on http://localhost:${port}`)
)