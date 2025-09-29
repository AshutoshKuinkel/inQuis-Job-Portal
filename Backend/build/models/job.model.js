"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../types/enum.types");
const jobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, `A title for your job is required.`]
    },
    companyName: {
        type: String,
        required: [true, `A company name for job is required.`]
    },
    description: {
        type: String,
        required: [true, `Please enter a job description.`]
    },
    location: {
        type: String,
        required: [true, 'Please set a location for your job.']
    },
    salary: {
        type: String,
    },
    jobType: {
        type: String,
        enum: Object.values(enum_types_1.job_type),
        default: enum_types_1.job_type.FULL_TIME
    },
    contactEmail: {
        type: String,
        required: [true, 'Please set a contact email to receive updates about your job posting.']
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please select a category for your job, or one that best matches.']
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    postedBy: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, `Reference to employer user ID not found`]
    }
}, { timestamps: true });
// Create indexes
jobSchema.index({ location: 1 }); // ascending index on location
jobSchema.index({ createdAt: -1 }); // descending index on createdAt for latest first sorting
jobSchema.index({ salary: -1 }); // descending index on salary for highest salary sorting
exports.Job = mongoose_1.default.model('Job', jobSchema);
//just build the CRUD for this API now.
