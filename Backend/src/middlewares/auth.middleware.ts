//get cookie response, {just get our access token and if we don't have an access token return access denied unauthorised. This is to restrict somethings to logged in users only.}

import { NextFunction, Request, Response } from "express";
import CustomError from "./error-handler.middleware";
import { verifyAccessToken } from "../utils/jwt.utils";
import { User } from "../models/user.model";
import { Role } from "../types/enum.types";

//verify token, {add the verify function to jwt utils.} {do the ijwtdecodedpayload which extends ijwtpayload and adds, iat, exp.} {make sure the token is not expired. }

//check that the user exists using the user model and passing the decodedData._id

//roles includes.... {}

//

export const authenticate = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //getting the token:
      const inQuis_portal_accessToken = req.cookies.inQuis_portal_accessToken;

      if (!inQuis_portal_accessToken) {
        throw new CustomError(`No token.`, 401);
      }

      //verifying token:
      const decodedData = verifyAccessToken(inQuis_portal_accessToken);

      if (Date.now() > decodedData.exp * 1000) {
        res.clearCookie('inQuis_portal_accessToken', {
          secure: process.env.NODE_ENV === "development" ? false : true,
          httpOnly: true,
          sameSite:'none'
        });
        throw new CustomError(`Session expired. Access denied.`, 401);
      }

      //checking user exists.
      const user = await User.findById(decodedData._id);

      if (!user) {
        throw new CustomError(`No User.`, 401);
      }

      //role based authorisation:
      if (roles && !roles.includes(decodedData.role)) {
        throw new CustomError(`Unauthorised. Access Denied.`, 403);
      }

      req.user = {
        _id: decodedData._id,
        email: decodedData.email,
        role: decodedData.role,
        first_name: decodedData.first_name,
        last_name: decodedData.last_name,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};
