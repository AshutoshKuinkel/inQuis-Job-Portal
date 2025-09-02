import express from "express";
import {getFeaturedJobs,postFeaturedJob} from '../controllers/featured-job.controller'
import { admin } from "../types/enum.types";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router()

router.post('/postFeaturedJob',authenticate(admin),postFeaturedJob)
router.get('/getFeaturedJobs',authenticate(admin),getFeaturedJobs)

export default router