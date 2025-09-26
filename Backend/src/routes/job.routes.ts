import  express  from "express";
import { createJob,readJob,getAllJobs,updateJob,deleteJob, resumeScorer} from "../controllers/job.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { employer, seeker } from "../types/enum.types";
import multer from "multer";

const router = express.Router()

//for temporary storagre of the resume user uploads:
const upload = multer({dest:'uploads/'})

router.post('/createJob',authenticate(employer),createJob)
router.get('/myJob/:jobId',authenticate(employer),readJob)
router.get('/myJobs',authenticate(employer),getAllJobs)
router.put('/myJob/update/:jobId',authenticate(employer),updateJob)
router.delete('/myJob/delete/:jobId',authenticate(employer),deleteJob)
router.post('/assessResume/:jobId',authenticate(seeker),upload.single('resume'),resumeScorer)


export default router