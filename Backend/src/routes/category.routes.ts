import express from 'express'
import {createCategory,fetchCategories} from '../controllers/category.controller'
import { authenticate } from '../middlewares/auth.middleware'
import { admin } from '../types/enum.types'

const router = express.Router()

router.post('/category/create',authenticate(admin),createCategory)

export default router