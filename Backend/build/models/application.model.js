"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../types/enum.types");
const applicationSchema = new mongoose_1.default.Schema({
    job: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, `Please select a job to apply for.`]
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required.']
    },
    lastName: {
        type: String,
        required: [true, 'First Name is required.']
    },
    contactEmail: {
        type: String,
        required: [true, `Contact email required.`]
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is required.']
    },
    linkedinProfile: {
        type: String,
    },
    resume: {
        path: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    relevantExperience: {
        type: String,
        required: [true, 'First Name is required.']
    },
    coverLetter: {
        type: String,
        required: [true, `Cover Letter is required.`]
    },
    availability: {
        type: String,
        required: [true, `Availability is required.`]
    },
    status: {
        type: String,
        enum: Object.values(enum_types_1.applicationStatus),
        default: enum_types_1.applicationStatus.PENDING
    },
    applicant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
exports.Application = mongoose_1.default.model(`Application`, applicationSchema);
