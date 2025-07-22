import express, { json } from "express"
import dotenv from "dotenv"
import { connectDB } from "./db"
import todoRoutes from "./routes/todo"
import cors from "cors"

dotenv.config({
    path: ".env"
})

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
}))
app.use(json())

app.use(todoRoutes)
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Sever is running on ${PORT}`);
    connectDB()
    
})
