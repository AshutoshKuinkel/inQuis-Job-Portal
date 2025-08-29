"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCategories = exports.createCategory = void 0;
const category_model_1 = require("../models/category.model");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new error_handler_middleware_1.default(`Please Select Name for Category.`, 400);
        }
        const category = await category_model_1.Category.create({ name });
        res.status(201).json({
            message: `Category Successfully Added.`,
            data: category
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createCategory = createCategory;
const fetchCategories = async (req, res, next) => {
    try {
        const category = await category_model_1.Category.find();
        if (!category) {
            throw new error_handler_middleware_1.default('No Categories Registered yet. Please Add some to View.', 400);
        }
        res.status(201).json({
            message: `Categories Fetched.`,
            data: category
        });
    }
    catch (err) {
        next(err);
    }
};
exports.fetchCategories = fetchCategories;
