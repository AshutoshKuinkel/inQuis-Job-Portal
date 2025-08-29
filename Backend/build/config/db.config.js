"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ConnectDatabase = (DB_URI) => {
    mongoose_1.default.connect(DB_URI, {})
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
};
exports.ConnectDatabase = ConnectDatabase;
