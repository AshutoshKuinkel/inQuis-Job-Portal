"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
//for temporary storagre of the resume user uploads:
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/createJob', (0, auth_middleware_1.authenticate)(enum_types_1.employer), job_controller_1.createJob);
router.get('/myJob/:jobId', (0, auth_middleware_1.authenticate)(enum_types_1.employer), job_controller_1.readJob);
router.get('/myJobs', (0, auth_middleware_1.authenticate)(enum_types_1.employer), job_controller_1.getAllJobs);
router.put('/myJob/update/:jobId', (0, auth_middleware_1.authenticate)(enum_types_1.employer), job_controller_1.updateJob);
router.delete('/myJob/delete/:jobId', (0, auth_middleware_1.authenticate)(enum_types_1.employer), job_controller_1.deleteJob);
router.post('/assessResume/:jobId', (0, auth_middleware_1.authenticate)(enum_types_1.seeker), upload.single('resume'), job_controller_1.resumeScorer);
exports.default = router;
