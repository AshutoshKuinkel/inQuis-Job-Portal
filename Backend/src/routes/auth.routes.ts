import express from 'express'
import { login, registerUser } from '../controllers/auth.controller'

const router = express.Router()

router.post('/Signup',registerUser)
router.post('/Login',login)

export default router