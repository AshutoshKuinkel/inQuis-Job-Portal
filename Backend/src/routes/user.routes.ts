import { authenticate } from './../middlewares/auth.middleware';
import  express  from "express";
import { updateEmployerProfile, updateSeekerProfile, viewProfile } from "../controllers/user.controller";
import { employer, Role, seeker } from '../types/enum.types';

const router = express.Router()

router.get('/profile',authenticate(),viewProfile)
router.put('/updateProfile',authenticate(seeker),updateSeekerProfile)
router.put('/updateProfile',authenticate(employer),updateEmployerProfile)




export default router