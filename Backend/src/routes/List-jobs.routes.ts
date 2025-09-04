import  express  from "express";
import { getJobByCategory, getJobById, listJobs } from "../controllers/job.controller";

const router = express.Router()

router.get('/jobs',listJobs)
router.get('/jobs/:id',getJobById)
router.get('/jobs/field/:id',getJobByCategory)

export default router