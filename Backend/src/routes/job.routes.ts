import  express  from "express";
import { createJob,readJob,getAllJobs,updateJob,deleteJob} from "../controllers/job.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { employer } from "../types/enum.types";

const router = express.Router()

router.post('/createJob',authenticate(employer),createJob)
router.get('/myJob/:jobId',authenticate(employer),readJob)
router.get('/myJobs',authenticate(employer),getAllJobs)
router.put('/myJob/update/:jobId',authenticate(employer),updateJob)
router.delete('/myJob/delete/:jobId',authenticate(employer),deleteJob)


export default router