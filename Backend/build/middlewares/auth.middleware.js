"use strict";
//get cookie response, {just get our access token and if we don't have an access token return access denied unauthorised. This is to restrict somethings to logged in users only.}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const error_handler_middleware_1 = __importDefault(require("./error-handler.middleware"));
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = require("../models/user.model");
//verify token, {add the verify function to jwt utils.} {do the ijwtdecodedpayload which extends ijwtpayload and adds, iat, exp.} {make sure the token is not expired. }
//check that the user exists using the user model and passing the decodedData._id
//roles includes.... {}
//
const authenticate = (roles) => {
    return async (req, res, next) => {
        try {
            //getting the token:
            const inQuis_portal_accessToken = req.cookies.inQuis_portal_accessToken;
            if (!inQuis_portal_accessToken) {
                throw new error_handler_middleware_1.default(`No token.`, 401);
            }
            //verifying token:
            const decodedData = (0, jwt_utils_1.verifyAccessToken)(inQuis_portal_accessToken);
            if (Date.now() > decodedData.exp * 1000) {
                res.clearCookie('inQuis_portal_accessToken', {
                    secure: process.env.NODE_ENV === "development" ? false : true,
                    httpOnly: true,
                    sameSite: 'none'
                });
                throw new error_handler_middleware_1.default(`Session expired. Access denied.`, 401);
            }
            //checking user exists.
            const user = await user_model_1.User.findById(decodedData._id);
            if (!user) {
                throw new error_handler_middleware_1.default(`No User.`, 401);
            }
            //role based authorisation:
            if (roles && !roles.includes(decodedData.role)) {
                throw new error_handler_middleware_1.default(`Unauthorised. Access Denied.`, 403);
            }
            req.user = {
                _id: decodedData._id,
                email: decodedData.email,
                role: decodedData.role,
                first_name: decodedData.first_name,
                last_name: decodedData.last_name,
            };
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.authenticate = authenticate;
