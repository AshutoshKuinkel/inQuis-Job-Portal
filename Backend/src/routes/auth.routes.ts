import express from 'express'
import { login, logout, registerUser } from '../controllers/auth.controller'

const router = express.Router()

router.post('/signup',registerUser)
router.post('/login',login)
router.post('/logout',logout)

export default router