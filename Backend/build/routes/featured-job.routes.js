"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const featured_job_controller_1 = require("../controllers/featured-job.controller");
const enum_types_1 = require("../types/enum.types");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/postFeaturedJob', (0, auth_middleware_1.authenticate)(enum_types_1.admin), featured_job_controller_1.postFeaturedJob);
router.get('/getFeaturedJobs', (0, auth_middleware_1.authenticate)(enum_types_1.admin), featured_job_controller_1.getFeaturedJobs);
exports.default = router;
