import  express  from "express";
import { getJobByCategory, listJobs } from "../controllers/job.controller";

const router = express.Router()

router.get('/jobs',listJobs)
router.get('/jobs/field/:id',getJobByCategory)

export default router