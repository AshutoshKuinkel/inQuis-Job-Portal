"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.logout = exports.login = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const enum_types_1 = require("../types/enum.types");
const jwt_utils_1 = require("../utils/jwt.utils");
const registerUser = async (req, res, next) => {
    try {
        const { email, password, first_name, last_name, seekerResume, companyName, role } = req.body;
        if (!email) {
            throw new error_handler_middleware_1.default(`Email is required.`, 400);
        }
        if (3 > email.length || email.length > 50) {
            throw new error_handler_middleware_1.default(`Please enter an email address between 3 & 50 characters.`, 400);
        }
        if (!password) {
            throw new error_handler_middleware_1.default(`Password is required.`, 400);
        }
        if (8 > password.length) {
            throw new error_handler_middleware_1.default(`Please enter a password greater than 8 characters.`, 400);
        }
        if (!first_name) {
            throw new error_handler_middleware_1.default(`First Name is required.`, 400);
        }
        if (!last_name) {
            throw new error_handler_middleware_1.default(`Last Name is required.`, 400);
        }
        const hashedPassword = await (0, bcrypt_utils_1.hashPassword)(password);
        const user = await user_model_1.User.create({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            role: role === enum_types_1.Role.EMPLOYER ? enum_types_1.Role.EMPLOYER : undefined,
        });
        await user.save();
        const userObj = user.toObject();
        const { password: pass, ...secureUser } = userObj;
        res.status(201).json({
            message: `User successfully registered.`,
            data: secureUser
        });
    }
    catch (err) {
        next(err);
    }
};
exports.registerUser = registerUser;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new error_handler_middleware_1.default(`An email is required.`, 400);
        }
        if (!password) {
            throw new error_handler_middleware_1.default(`A password is required.`, 400);
        }
        const user = await user_model_1.User.findOne({ email }).select('+password');
        if (!user) {
            throw new error_handler_middleware_1.default(`There seems to be no account registered under that email. Please sign up instead.`, 400);
        }
        const isPassMatch = await (0, bcrypt_utils_1.comparePassword)(password, user.password);
        if (!isPassMatch) {
            throw new error_handler_middleware_1.default('Invalid Credentials', 400);
        }
        const payload = {
            _id: user._id,
            email: user.email,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name
        };
        const inQuis_portal_accessToken = (0, jwt_utils_1.generateAccessToken)(payload);
        const userObj = user.toObject();
        const { password: pass, ...secureUser } = userObj;
        res.cookie('inQuis_portal_accessToken', inQuis_portal_accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development' ? false : true,
            maxAge: Number(process.env.COOKIE_EXPIRE_IN) * 24 * 60 * 60 * 1000,
            // sameSite:'none'
        })
            .status(200).json({
            message: `Successfully logged in.`,
            data: secureUser, inQuis_portal_accessToken
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        res.clearCookie('inQuis_portal_accessToken', {
            secure: process.env.NODE_ENV === 'development' ? false : true,
            httpOnly: true,
            sameSite: 'none'
        })
            .status(200).json({
            message: `Successfully Logged out.`,
            data: null
        });
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
//check
const profile = async (req, res, next) => {
    try {
        const id = req.user._id;
        const user = await user_model_1.User.findById(id);
        if (!user) {
            throw new error_handler_middleware_1.default(`User fetch Error.`, 400);
        }
        res.status(200).json({
            message: 'Profile fetched.',
            data: user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.profile = profile;
