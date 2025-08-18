import  express  from "express";
import { listJobs } from "../controllers/job.controller";

const router = express.Router()

router.get('',listJobs)

export default router