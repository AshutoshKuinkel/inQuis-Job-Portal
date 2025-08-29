"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET ?? '';
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN ?? '';
const generateAccessToken = (IJWTPayload) => {
    return jsonwebtoken_1.default.sign(IJWTPayload, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
