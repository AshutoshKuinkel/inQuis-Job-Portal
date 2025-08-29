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
    contactEmail: {
        type: String,
        required: [true, `Contact email required.`]
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
    coverLetter: {
        path: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
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
