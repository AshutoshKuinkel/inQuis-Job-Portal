"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployerProfile = exports.updateSeekerProfile = exports.viewProfile = void 0;
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const user_model_1 = require("../models/user.model");
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
//later on after building this controller, change the data to send the stuff we want the user to see only.
//we don't really need to show the id of the user to the user, role, updated at.
const viewProfile = async (req, res, next) => {
    try {
        const id = req.user._id;
        const user = await user_model_1.User.findById(id);
        if (!user) {
            throw new error_handler_middleware_1.default(`Unauthorised. Access Denied.`, 400);
        }
        res.status(200).json({
            message: `User profile successfully loaded`,
            data: user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.viewProfile = viewProfile;
const updateSeekerProfile = async (req, res, next) => {
    try {
        // get the user data through like our view profile, have {input fields} = req.body, if anything is changed set user.{input field} = input field.
        const id = req.user._id;
        const user = await user_model_1.User.findById(id);
        if (!user) {
            throw new error_handler_middleware_1.default(`Unauthorised. Access Denied.`, 400);
        }
        const { email, password, first_name, last_name } = req.body;
        //The { [key: string]: any } allows for optional extra fields. E.g password etc.
        const updatedData = { email, first_name, last_name };
        if (email) {
            if (3 > email.length || email.length > 50) {
                throw new error_handler_middleware_1.default(`Please enter an email address between 3 & 50 characters.`, 400);
            }
        }
        if (password) {
            if (8 > password.length) {
                throw new error_handler_middleware_1.default(`Please enter a password greater than 8 characters.`, 400);
            }
            //add password to updated data:
            const hashedPassword = await (0, bcrypt_utils_1.hashPassword)(password);
            updatedData.password = hashedPassword;
        }
        const updatedInfo = await user_model_1.User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        res.status(200).json({
            message: `Profile Info Successfully Updated.`,
            data: updatedInfo
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateSeekerProfile = updateSeekerProfile;
const updateEmployerProfile = async (req, res, next) => {
    try {
        const id = req.user._id;
        const user = await user_model_1.User.findById(id);
        if (!user) {
            throw new error_handler_middleware_1.default(`Unauthorised. Access Denied.`, 400);
        }
        const { email, password, first_name, last_name } = req.body;
        //The { [key: string]: any } allows for optional extra fields. E.g password etc.
        const updatedData = { email, first_name, last_name };
        if (email) {
            if (3 > email.length || email.length > 50) {
                throw new error_handler_middleware_1.default(`Please enter an email address between 3 & 50 characters.`, 400);
            }
        }
        if (password) {
            if (8 > password.length) {
                throw new error_handler_middleware_1.default(`Please enter a password greater than 8 characters.`, 400);
            }
            //add password to updated data:
            const hashedPassword = await (0, bcrypt_utils_1.hashPassword)(password);
            updatedData.password = hashedPassword;
        }
        const updatedInfo = await user_model_1.User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        res.status(200).json({
            message: `Profile Info Successfully Updated.`,
            data: updatedInfo
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateEmployerProfile = updateEmployerProfile;
