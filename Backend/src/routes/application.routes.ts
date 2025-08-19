import { authenticate } from './../middlewares/auth.middleware';
import express from 'express';
import {apply,viewMyApplications,update,withdraw, viewApplicants,updateApplicationStatus} from '../controllers/application.controller'
import { seeker } from '../types/enum.types';
import { employer } from '../types/enum.types';

const router = express.Router()

router.post('/apply/:jobId',authenticate(seeker),apply)
router.get('/myApplications',authenticate(seeker),viewMyApplications)
router.put('/updateApplication/:jobId',authenticate(seeker),update)
router.delete('/withdrawApplication/:jobId',authenticate(seeker),withdraw)

router.get('/applications/:jobId',authenticate(employer),viewApplicants)
router.put('/applications/:jobId/:applicationId',authenticate(employer),updateApplicationStatus)

export default router;
