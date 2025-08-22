import express from 'express'
import { login, logout, registerUser } from '../controllers/auth.controller'

const router = express.Router()

router.post('/Signup',registerUser)
router.post('/Login',login)
router.post('/logout',logout)

export default router