import express from 'express'
import { login, logout, profile, registerUser } from '../controllers/auth.controller'
import { authenticate } from '../middlewares/auth.middleware'
import { everyone } from '../types/enum.types'

const router = express.Router()

router.post('/signup',registerUser)
router.post('/login',login)
router.post('/logout',logout)
router.get('/me',authenticate(everyone),profile) 


export default router