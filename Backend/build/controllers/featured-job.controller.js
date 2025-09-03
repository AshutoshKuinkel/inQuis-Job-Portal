"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedJobs = exports.postFeaturedJob = void 0;
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const category_model_1 = require("../models/category.model");
const featured_job_model_1 = require("../models/featured-job.model");
const postFeaturedJob = async (req, res, next) => {
    try {
        const id = req.user._id;
        if (!id) {
            throw new error_handler_middleware_1.default(`Unauthorized. Access denied.`, 401);
        }
        const { title, companyName, description, location, salary, jobType, contactEmail, category, } = req.body;
        const postedBy = id;
        if (!title) {
            throw new error_handler_middleware_1.default(`Please enter job title.`, 400);
        }
        if (!contactEmail) {
            throw new error_handler_middleware_1.default(`Please enter contact email.`, 400);
        }
        if (!description) {
            throw new error_handler_middleware_1.default(`Please enter job description.`, 400);
        }
        if (!location) {
            throw new error_handler_middleware_1.default(`Please enter job location.`, 400);
        }
        if (!companyName) {
            throw new error_handler_middleware_1.default(`Please enter Company Name.`, 400);
        }
        if (!category) {
            throw new error_handler_middleware_1.default(`Please select Category.`, 400);
        }
        const fetchCategory = await category_model_1.Category.findById(category);
        if (!fetchCategory) {
            throw new error_handler_middleware_1.default(`Category not found`, 400);
        }
        const featured = await featured_job_model_1.featuredJob.create({
            title,
            companyName,
            description,
            location,
            salary,
            jobType,
            contactEmail,
            postedBy,
            category,
        });
        res.status(201).json({
            message: `New Job Successfully Posted.`,
            data: featured,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.postFeaturedJob = postFeaturedJob;
const getFeaturedJobs = async (req, res, next) => {
    try {
        const featured = await featured_job_model_1.featuredJob.find().populate('category');
        res.status(200).json({
            message: `Featured Jobs Successfully Fetched.`,
            data: featured,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getFeaturedJobs = getFeaturedJobs;
