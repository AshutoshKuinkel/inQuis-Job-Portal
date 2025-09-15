"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobById = exports.getJobByCategory = exports.listJobs = exports.deleteJob = exports.updateJob = exports.getAllJobs = exports.readJob = exports.createJob = void 0;
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const job_model_1 = require("../models/job.model");
const pagination_utils_1 = require("../utils/pagination.utils");
const category_model_1 = require("../models/category.model");
const createJob = async (req, res, next) => {
    try {
        const id = req.user._id;
        if (!id) {
            throw new error_handler_middleware_1.default(`401 code 2`, 401);
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
        let job = await job_model_1.Job.create({
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
        job = await job.populate("category");
        res.status(201).json({
            message: `New Job Successfully Posted.`,
            data: job,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createJob = createJob;
const readJob = async (req, res, next) => {
    try {
        const id = req.user._id;
        const { jobId } = req.params;
        if (!id) {
            throw new error_handler_middleware_1.default(`401 code 3`, 401);
        }
        const job = await job_model_1.Job.findById(jobId).populate("category");
        if (!job) {
            throw new error_handler_middleware_1.default(`A Job with that Id does not exist.`, 404);
        }
        if (id.toString() !== job.postedBy.toString()) {
            throw new error_handler_middleware_1.default(`Unauthorized. Access denied.`, 403);
        }
        res.status(200).json({
            message: `Job Successfully Fetched.`,
            data: job,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.readJob = readJob;
//pagination successfully added.
const getAllJobs = async (req, res, next) => {
    try {
        const id = req.user._id;
        const { currentPage, perPage } = req.query;
        const page = Number(currentPage) || 1;
        const limit = Number(perPage) || 10;
        const skip = (page - 1) * limit;
        if (!id) {
            throw new error_handler_middleware_1.default(`401 code 4`, 401);
        }
        const jobs = await job_model_1.Job.find({ postedBy: id })
            .populate("category")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
        const total = await job_model_1.Job.countDocuments({ postedBy: id });
        const pagination = (0, pagination_utils_1.getPagination)(total, page, limit);
        res.status(200).json({
            message: `Jobs Successfully Fetched.`,
            data: jobs,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllJobs = getAllJobs;
const updateJob = async (req, res, next) => {
    try {
        const id = req.user._id;
        const { jobId } = req.params;
        const job = await job_model_1.Job.findById(jobId);
        if (!job) {
            throw new error_handler_middleware_1.default(`No Job exists with that id.`, 400);
        }
        if (id.toString() !== job.postedBy.toString()) {
            throw new error_handler_middleware_1.default(`Unauthorized. Access Denied.`, 403);
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new error_handler_middleware_1.default("Nothing to update.", 400);
        }
        const { title, companyName, description, location, salary, jobType, contactEmail, } = req.body;
        const updatedJob = await job_model_1.Job.findByIdAndUpdate(jobId, {
            title: title,
            companyName: companyName,
            description: description,
            location: location,
            salary: salary,
            contactEmail: contactEmail,
            jobType: jobType,
        }, { new: true, runValidators: true }).populate("category");
        res.status(200).json({
            message: `Job Successfully updated.`,
            data: updatedJob,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateJob = updateJob;
const deleteJob = async (req, res, next) => {
    try {
        const id = req.user._id;
        const { jobId } = req.params;
        const job = await job_model_1.Job.findById(jobId);
        if (!job) {
            throw new error_handler_middleware_1.default(`No Job exists with that id.`, 400);
        }
        if (id.toString() !== job.postedBy.toString()) {
            throw new error_handler_middleware_1.default(`Unauthorized. Access Denied.`, 403);
        }
        const deletedJob = await job_model_1.Job.findByIdAndDelete(jobId);
        res.status(200).json({
            message: `Job successfully deleted.`,
            data: deletedJob,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteJob = deleteJob;
//Public Job Listing API.
//{This allows users to view jobs without being logged in. So no auth func call needed.}
//{This part will be featured on the home page aswell.}
//{Even though it will be featured on the home page, make sure we have a site/jobs route.}
//{Maybe display like 10 jobs titled Our Employers are searching, check if you have what it takes to land some new roles on home page,
//and then we have a continue searching button that guides users to /jobs route.}
//maybe change this to text later instead of $regex if needed.
const listJobs = async (req, res, next) => {
    try {
        const { currentPage, query, location, //This is for the filtering
        sortBy, //This is for sorting
         } = req.query;
        let filter = {};
        const page = Number(currentPage) || 1;
        const limit = 15;
        const skip = (page - 1) * limit;
        if (query) {
            filter.$or = [
                {
                    name: {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: query,
                        $options: "i",
                    },
                },
            ];
        }
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i",
            };
        }
        if (req.query.isFeatured) {
            const isFeatured = req.query.isFeatured === "true";
            filter.isFeatured = isFeatured;
        }
        let sortOption = {};
        switch (sortBy) {
            case "latest":
                sortOption = { createdAt: -1 };
                break;
            case "oldest":
                sortOption = { createdAt: 1 };
                break;
            case "highestSalary":
                sortOption = { salary: -1 };
                break;
            case "lowestSalary":
                sortOption = { salary: 1 };
                break;
        }
        if (!sortOption) {
            sortOption = { createdAt: -1 };
        }
        let jobs = await job_model_1.Job.find(filter)
            .sort(sortOption)
            .limit(limit)
            .skip(skip)
            .populate("category");
        let total = await job_model_1.Job.countDocuments(filter);
        if (jobs.length === 0) {
            jobs = await job_model_1.Job.find({})
                .sort(sortOption)
                .limit(limit)
                .skip(skip)
                .populate("category");
            total = await job_model_1.Job.countDocuments({});
        }
        const pagination = (0, pagination_utils_1.getPagination)(total, page, limit);
        res.status(200).json({
            message: `All Jobs Fetched Successfully.`,
            data: jobs,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.listJobs = listJobs;
// get jobs by category
const getJobByCategory = async (req, res, next) => {
    try {
        const { id } = req.params; // categoryId
        const { currentPage } = req.query;
        const page = Number(currentPage) || 1;
        const limit = 15;
        const skip = (page - 1) * limit;
        // check if category exists
        const category = await category_model_1.Category.findById(id);
        if (!category) {
            throw new error_handler_middleware_1.default(`Category not found`, 404);
        }
        const total = await job_model_1.Job.countDocuments({ category: id });
        const totalPages = Math.ceil(total / limit);
        if (page > totalPages && totalPages !== 0) {
            throw new error_handler_middleware_1.default(`Page out of range`, 400);
        }
        // get jobs with pagination
        const jobs = await job_model_1.Job.find({ category: id })
            .populate("category")
            .skip(skip)
            .limit(limit);
        if (!jobs || jobs.length === 0) {
            throw new error_handler_middleware_1.default(`No Jobs found for this category`, 404);
        }
        const pagination = (0, pagination_utils_1.getPagination)(total, page, limit);
        res.status(200).json({
            message: `Jobs from category fetched successfully`,
            data: jobs,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getJobByCategory = getJobByCategory;
//get job by id:
const getJobById = async (req, res, next) => {
    const { id } = req.params;
    const job = await job_model_1.Job.findById(id).populate("category");
    if (!job) {
        throw new error_handler_middleware_1.default(`Job not Found`, 404);
    }
    res.status(200).json({
        message: `Job Successfully fetched.`,
        data: job,
    });
};
exports.getJobById = getJobById;
