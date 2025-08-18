import express,{Request,Response} from "express";
import dotenv from "dotenv";
dotenv.config()
import { ConnectDatabase } from "./config/db.config";
import CustomError, { errorHandler } from "./middlewares/error-handler.middleware";
import cookieParser from 'cookie-parser';


const PORT = process.env.PORT
const DB_URI = process.env.DB_URI ?? ''
ConnectDatabase(DB_URI)

const app = express()

app.use(express.json());        // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form-urlencoded bodies
app.use(cookieParser())

//importing routes:
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import jobRoutes from './routes/job.routes'
import listJobRoutes from './routes/List-jobs.routes'

app.get('/',(req:Request,res:Response)=>{
  res.status(200).json({
    message:'InQuis Job Portal'
  })
})

//using routes:
app.use('',authRoutes)
app.use('/user',userRoutes)
app.use('/employer',jobRoutes)
app.use('/jobs',listJobRoutes)

app.all('/{*all}',(req:Request,res:Response)=>{
  const message = `Cannot ${req.method} @ ${req.originalUrl}`
  throw new CustomError(message,404)
})


app.listen(PORT,()=>{
  console.log(`Server: http://localhost:${PORT}`)
})

//using our middleware function:
app.use(errorHandler)
