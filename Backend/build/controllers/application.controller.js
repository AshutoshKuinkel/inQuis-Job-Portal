"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatus = exports.getRecentApplications = exports.getAllApplications = exports.viewApplicants = exports.withdraw = exports.update = exports.viewMyApplications = exports.viewApplicationById = exports.apply = void 0;
const application_model_1 = require("../models/application.model");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const job_model_1 = require("../models/job.model");
const pagination_utils_1 = require("../utils/pagination.utils");
const cloudinary_service_utils_1 = require("../utils/cloudinary-service.utils");
const nodemailer_utils_1 = require("../utils/nodemailer.utils");
const email_utils_1 = require("../utils/email.utils");
const folder_name = "/documents";
//Also implement node mailer so when user applies to a job they get an email,
//and when employer changes status, the applicant also gets notified.
const apply = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const job = await job_model_1.Job.findById(jobId);
        if (!job) {
            throw new error_handler_middleware_1.default(`Job not found`, 404);
        }
        const { firstName, lastName, contactEmail, phoneNumber, linkedinProfile, relevantExperience, coverLetter, availability, } = req.body;
        if (!contactEmail) {
            throw new error_handler_middleware_1.default("Contact email required.", 400);
        }
        if (!firstName) {
            throw new error_handler_middleware_1.default("First Name required.", 400);
        }
        if (!lastName) {
            throw new error_handler_middleware_1.default("Last Name required.", 400);
        }
        if (!phoneNumber) {
            throw new error_handler_middleware_1.default("Phone Number required.", 400);
        }
        if (!relevantExperience) {
            throw new error_handler_middleware_1.default("Relevant Experience required.", 400);
        }
        if (!coverLetter) {
            throw new error_handler_middleware_1.default("Cover Letter required.", 400);
        }
        if (!availability) {
            throw new error_handler_middleware_1.default("Availability required.", 400);
        }
        // if(!resume){
        //   throw new CustomError('Resume required.',400)
        // }
        const existing = await application_model_1.Application.findOne({
            job: jobId,
            applicant: req.user._id,
        });
        if (existing)
            throw new error_handler_middleware_1.default("You have already applied to this job.", 400);
        // Multer files
        const files = req.files;
        if (!files?.resume?.[0]) {
            throw new error_handler_middleware_1.default("Resume file is required", 400);
        }
        // Upload resume
        const { path: resumeUrl, public_id: resumeId } = await (0, cloudinary_service_utils_1.uploadFile)(files.resume[0].path, folder_name);
        const application = new application_model_1.Application({
            job: jobId,
            firstName,
            lastName,
            contactEmail,
            phoneNumber,
            linkedinProfile,
            relevantExperience,
            coverLetter,
            availability,
            resume: { path: resumeUrl, public_id: resumeId },
            applicant: req.user._id,
        });
        await application.save();
        const user = req.user;
        //sending email to let user know they've applied:
        await (0, nodemailer_utils_1.sendEmail)({
            to: `${application.contactEmail}`,
            subject: `Application to ${job?.title || "Job"} at ${job?.companyName || "Company"}.`,
            html: (0, email_utils_1.generate_confirmation_email)(application, job, user),
        });
        //sending email to employer aswell to let them know they have a new application:
        await (0, nodemailer_utils_1.sendEmail)({
            to: `${job.contactEmail}`,
            subject: `New Application Received to ${job?.title || "Job"} position.`,
            html: (0, email_utils_1.generate_employer_application_email)(application, job),
        });
        res.status(201).json({
            message: `Successfully applied!`,
            data: application,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.apply = apply;
const viewApplicationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user._id;
        const application = await application_model_1.Application.findById(id);
        if (!application) {
            throw new error_handler_middleware_1.default(`We couldn't find that Application`, 404);
        }
        if (user.toString() !== application.applicant.toString()) {
            throw new error_handler_middleware_1.default(`Unauthorised. Access Denied`, 403);
        }
        res.status(200).json({
            message: `Application fetched.`,
            data: application,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.viewApplicationById = viewApplicationById;
//view applications for job seekers.
const viewMyApplications = async (req, res, next) => {
    try {
        const { currentPage, perPage } = req.query;
        const applicant = req.user._id;
        const page = Number(currentPage) || 1;
        const limit = Number(perPage) || 5;
        const skip = Number(page - 1) * limit;
        console.log("applicant id:", applicant);
        const applications = await application_model_1.Application.find({ applicant })
            .populate("job")
            .limit(limit)
            .skip(skip);
        const total = await application_model_1.Application.countDocuments({ applicant });
        const pagination = (0, pagination_utils_1.getPagination)(total, page, limit);
        res.status(201).json({
            message: `Applications successfully fetched`,
            data: applications,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.viewMyApplications = viewMyApplications;
//update application for job seekers.
const update = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const job = await job_model_1.Job.findById(jobId);
        if (!job) {
            throw new error_handler_middleware_1.default(`Job not found`, 404);
        }
        const { deletedFile, firstName, lastName, contactEmail, phoneNumber, linkedinProfile, relevantExperience, coverLetter, availability, } = req.body;
        const resume = req.files?.resume;
        let deletedFiles = [];
        if (deletedFile) {
            try {
                deletedFiles = JSON.parse(deletedFile);
            }
            catch {
                throw new error_handler_middleware_1.default("Invalid format for deletedFile. Expected JSON array.", 400);
            }
        }
        const fetchApplication = await application_model_1.Application.findOne({
            job: jobId,
            applicant: req.user._id,
        });
        let application;
        if (fetchApplication) {
            application = await application_model_1.Application.findByIdAndUpdate(fetchApplication._id, {
                firstName,
                lastName,
                contactEmail,
                phoneNumber,
                linkedinProfile,
                relevantExperience,
                coverLetter,
                availability,
            }, { new: true, runValidators: true }).populate("job");
        }
        else {
            throw new error_handler_middleware_1.default(`Cannot update info for a job you haven't applied to.`, 400);
        }
        if (!application) {
            throw new error_handler_middleware_1.default(`Nothing to update`, 400);
        }
        // Delete files if requested
        if (deletedFiles.includes("resume") && application.resume?.public_id) {
            await (0, cloudinary_service_utils_1.deleteFiles)([application.resume.public_id]);
            application.resume = undefined;
        }
        if (resume) {
            const { path, public_id } = await (0, cloudinary_service_utils_1.uploadFile)(resume[0].path, folder_name);
            if (application.resume) {
                await (0, cloudinary_service_utils_1.deleteFiles)([application.resume.public_id]);
            }
            application.resume = {
                path,
                public_id,
            };
        }
        await application.save();
        res.status(200).json({
            message: `Application Successfully updated!`,
            data: application,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
//withdraw application for job seekers.
const withdraw = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const job = await job_model_1.Job.findById(jobId);
        if (!job) {
            throw new error_handler_middleware_1.default(`Job not found`, 404);
        }
        const deletedApplication = await application_model_1.Application.findOneAndDelete({
            job: jobId,
            applicant: req.user._id,
        });
        if (!deletedApplication) {
            throw new error_handler_middleware_1.default(`You haven't applied to this job.`, 404);
        }
        if (deletedApplication.resume) {
            await (0, cloudinary_service_utils_1.deleteFiles)([deletedApplication.resume.public_id]);
        }
        res.status(200).json({
            message: `Application successfully withdrawn`,
            data: deletedApplication,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.withdraw = withdraw;
//view all applications for employers & give option to choose rejected or accepted.
const viewApplicants = async (req, res, next) => {
    try {
        const { currentPage, perPage } = req.query;
        const { jobId } = req.params;
        const page = Number(currentPage) || 1;
        const limit = Number(perPage) || 5;
        const skip = Number(page - 1) * limit;
        const job = await job_model_1.Job.findById(jobId);
        if (!job) {
            throw new error_handler_middleware_1.default(`Job not found`, 404);
        }
        if (req.user._id.toString() !== job.postedBy.toString()) {
            throw new error_handler_middleware_1.default(`Unauthorized. Access Denied.`, 403);
        }
        const applications = await application_model_1.Application.find({ job: jobId })
            .limit(limit)
            .skip(skip);
        const total = await application_model_1.Application.countDocuments({ job: jobId });
        const pagination = (0, pagination_utils_1.getPagination)(total, page, limit);
        res.status(200).json({
            message: `Applications fetched.`,
            data: applications,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.viewApplicants = viewApplicants;
const getAllApplications = async (req, res, next) => {
    try {
        const { currentPage } = req.query;
        const employerId = req.user._id;
        const page = Number(currentPage) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;
        // Find all jobs posted by the employer
        const jobs = await job_model_1.Job.find({ postedBy: employerId });
        if (jobs.length === 0) {
            throw new error_handler_middleware_1.default("No jobs found.", 404);
        }
        // The { $in: jobs.map((job) => job._id) } is going through each job posted by the employer and passing the id...
        //E.g if employer has 3 jobs, it's saying all jobs {$in:['jobId1','jobId2','jobId3']}.
        const applications = await application_model_1.Application.find({
            job: { $in: jobs.map((job) => job._id) },
        })
            .populate("job")
            .limit(limit)
            .skip(skip);
        const total = await application_model_1.Application.countDocuments({
            job: { $in: jobs.map((job) => job._id) },
        });
        const pagination = (0, pagination_utils_1.getPagination)(total, page, limit);
        res.status(200).json({
            message: `Applications fetched successfully.`,
            data: applications,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllApplications = getAllApplications;
const getRecentApplications = async (req, res, next) => {
    try {
        const { currentPage } = req.query;
        const employerId = req.user._id;
        const page = 1;
        const limit = 3;
        const skip = (page - 1) * limit;
        // Find all jobs posted by the employer
        const jobs = await job_model_1.Job.find({ postedBy: employerId });
        if (jobs.length === 0) {
            throw new error_handler_middleware_1.default("No jobs found.", 404);
        }
        // The { $in: jobs.map((job) => job._id) } is going through each job posted by the employer and passing the id...
        //E.g if employer has 3 jobs, it's saying all jobs {$in:['jobId1','jobId2','jobId3']}.
        const applications = await application_model_1.Application.find({
            job: { $in: jobs.map((job) => job._id) },
        })
            .populate("job")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
        const total = await application_model_1.Application.countDocuments({
            job: { $in: jobs.map((job) => job._id) },
        });
        const pagination = (0, pagination_utils_1.getPagination)(total, page, limit);
        res.status(200).json({
            message: `Recent Applications fetched successfully.`,
            data: applications,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getRecentApplications = getRecentApplications;
const updateApplicationStatus = async (req, res, next) => {
    try {
        const { applicationId, jobId } = req.query;
        const { status } = req.body;
        const user = req.user;
        if (!["ACCEPTED", "REJECTED"].includes(status)) {
            throw new error_handler_middleware_1.default("Invalid status. Please enter exactly ACCEPTED or REJECTED.", 400);
        }
        // Find job for authorization
        const job = await job_model_1.Job.findById(jobId);
        if (!job) {
            throw new error_handler_middleware_1.default("Job not found", 404);
        }
        if (req.user._id.toString() !== job.postedBy.toString()) {
            throw new error_handler_middleware_1.default("Unauthorized. Access Denied.", 403);
        }
        // Update application directly
        const application = await application_model_1.Application.findOneAndUpdate({ _id: applicationId, job: jobId }, // ensures the app belongs to the job
        { status }, { new: true } // return updated doc
        );
        if (!application) {
            throw new error_handler_middleware_1.default("Application not found for this job", 404);
        }
        //generating email for seeker:
        await (0, nodemailer_utils_1.sendEmail)({
            to: application.contactEmail,
            subject: `Your application for ${job.title} at ${job.companyName} has been updated`,
            html: (0, email_utils_1.generate_status_update_email)(application, job, user),
        });
        res.status(200).json({
            message: `Application status updated to ${status}.`,
            data: application,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateApplicationStatus = updateApplicationStatus;
