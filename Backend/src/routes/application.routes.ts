import { authenticate } from './../middlewares/auth.middleware';
import express from 'express';
import {apply,viewMyApplications,update,withdraw, viewApplicants,updateApplicationStatus, viewApplicationById, getAllApplications, getRecentApplications} from '../controllers/application.controller'
import { seeker } from '../types/enum.types';
import { employer } from '../types/enum.types';
import { uploader } from '../middlewares/uploader.middleware';

const router = express.Router()
const upload = uploader()

router.get('/myApplications',authenticate(seeker),viewMyApplications)
router.get('/myApplications/:id',authenticate(seeker),viewApplicationById) 
router.post('/apply/:jobId',authenticate(seeker),upload.fields([{name:'resume',maxCount:1}]),apply)
router.put('/updateApplication/:jobId',authenticate(seeker),upload.fields([{name:'resume',maxCount:1}]),update)
router.delete('/withdrawApplication/:jobId',authenticate(seeker),withdraw)

router.get('/applications/:jobId',authenticate(employer),viewApplicants)
router.get('/myJobs/allApplications',authenticate(employer),getAllApplications)
router.get('/myJobs/recentApplications',authenticate(employer),getRecentApplications)
router.put('/applications/:jobId/:applicationId',authenticate(employer),updateApplicationStatus)

export default router;
