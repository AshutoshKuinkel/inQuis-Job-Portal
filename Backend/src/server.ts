import express,{Request,Response} from "express";
import dotenv from "dotenv";
dotenv.config()
import { ConnectDatabase } from "./config/db.config";
import CustomError, { errorHandler } from "./middlewares/error-handler.middleware";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI ?? ''
ConnectDatabase(DB_URI)

const app = express()

app.use(helmet())
app.use(cookieParser())

const allowedOrigins = ['http://localhost:5173','https://inquis-portal.vercel.app']

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // <--- This sets Access-Control-Allow-Credentials: true
}));

app.use(express.json());        // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form-urlencoded bodies

//serving uploads as static files:
app.use('/uploads',express.static('uploads/'))

//importing routes:
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import jobRoutes from './routes/job.routes'
import listJobRoutes from './routes/List-jobs.routes'
import applicationRoutes from './routes/application.routes'
import categoryRoutes from './routes/category.routes'
import featuredJobRoutes from './routes/featured-job.routes'

app.get('/',(req:Request,res:Response)=>{
  res.status(200).json({
    message:'InQuis Job Portal'
  })
})

//using routes:
app.use('',authRoutes)
app.use('/user',userRoutes)
app.use('/employer',jobRoutes)
app.use('',listJobRoutes)
app.use('/jobs',applicationRoutes)
app.use('',categoryRoutes)
app.use('',featuredJobRoutes)

app.all('/{*all}',(req:Request,res:Response)=>{
  const message = `Cannot ${req.method} @ ${req.originalUrl}`
  throw new CustomError(message,404)
})


app.listen(PORT,()=>{
  console.log(`Server: http://localhost:${PORT}`)
})

//using our middleware function:
app.use(errorHandler)
