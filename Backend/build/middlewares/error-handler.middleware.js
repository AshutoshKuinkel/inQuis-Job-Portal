"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, CustomError);
    }
}
const errorHandler = async (err, req, res, next) => {
    const message = err?.message || 'Internal Server Error.';
    const statusCode = err?.statusCode || 500;
    res.status(statusCode).json({
        message: message,
        data: null
    });
};
exports.errorHandler = errorHandler;
exports.default = CustomError;
