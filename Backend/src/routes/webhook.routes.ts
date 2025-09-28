import express from 'express'
import bodyParser from "body-parser";
import { stripeWebhook } from '../controllers/job.controller';

const router = express.Router()

router.post('/webhook',bodyParser.raw({ type: "application/json" }),stripeWebhook)

export default router