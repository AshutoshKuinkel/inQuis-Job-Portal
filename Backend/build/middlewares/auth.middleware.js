"use strict";
// //get cookie response, {just get our access token and if we don't have an access token return access denied unauthorised. This is to restrict somethings to logged in users only.}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const error_handler_middleware_1 = __importDefault(require("./error-handler.middleware"));
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = require("../models/user.model");
// //verify token, {add the verify function to jwt utils.} {do the ijwtdecodedpayload which extends ijwtpayload and adds, iat, exp.} {make sure the token is not expired. }
// //check that the user exists using the user model and passing the decodedData._id
// //roles includes.... {}
// //
// export const authenticate = (roles?: Role[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       //getting the token:
//       const inQuis_portal_accessToken = req.cookies.inQuis_portal_accessToken;
//       if (!inQuis_portal_accessToken) {
//         throw new CustomError(`401 code 5`, 401);
//       }
//       //verifying token:
//       const decodedData = verifyAccessToken(inQuis_portal_accessToken);
//       if (Date.now() > decodedData.exp * 1000) {
//         res.clearCookie("inQuis_portal_accessToken", {
//           secure: process.env.NODE_ENV === "development" ? false : true,
//           httpOnly: true,
//           sameSite: "none",
//         });
//         throw new CustomError(`401 code 6`, 401);
//       }
//       //checking user exists.
//       const user = await User.findById(decodedData._id);
//       if (!user) {
//         throw new CustomError(`401 code 7`, 401);
//       }
//       //role based authorisation:
//       if (roles && !roles.includes(decodedData.role)) {
//         throw new CustomError(`Unauthorised. Access Denied.`, 403);
//       }
//       req.user = {
//         _id: decodedData._id,
//         email: decodedData.email,
//         role: decodedData.role,
//         first_name: decodedData.first_name,
//         last_name: decodedData.last_name,
//       };
//       next();
//     } catch (err) {
//       console.error("AUTH ERROR:", err); // add this
//       next(err);
//     }
//   };
// };
const authenticate = (roles) => {
    return async (req, res, next) => {
        const inQuis_portal_accessToken = req.cookies.inQuis_portal_accessToken;
        if (!inQuis_portal_accessToken) {
            console.log("NO TOKEN FOUND");
            return next(new error_handler_middleware_1.default("401 code 5", 401));
        }
        try {
            const decodedData = (0, jwt_utils_1.verifyAccessToken)(inQuis_portal_accessToken);
            if (Date.now() > decodedData.exp * 1000) {
                res.clearCookie("inQuis_portal_accessToken");
                return next(new error_handler_middleware_1.default("401 code 6", 401));
            }
            const user = await user_model_1.User.findById(decodedData._id);
            if (!user) {
                return next(new error_handler_middleware_1.default("401 code 7", 401));
            }
            if (roles && !roles.includes(decodedData.role)) {
                return next(new error_handler_middleware_1.default("403 code 1", 403));
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
            console.log("VERIFY ERROR:", err);
            return next(new error_handler_middleware_1.default("401 code 8", 401));
        }
    };
};
exports.authenticate = authenticate;
