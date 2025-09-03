import CustomError from "../middlewares/error-handler.middleware";
import { NextFunction, Request, Response } from "express";
import { Category } from "../models/category.model";
import { featuredJob } from "../models/featured-job.model";

export const postFeaturedJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;

    if (!id) {
      throw new CustomError(`Unauthorized. Access denied.`, 401);
    }

    const {
      title,
      companyName,
      description,
      location,
      salary,
      jobType,
      contactEmail,
      category,
    } = req.body;
    const postedBy = id;

    if (!title) {
      throw new CustomError(`Please enter job title.`, 400);
    }
    if (!contactEmail) {
      throw new CustomError(`Please enter contact email.`, 400);
    }
    if (!description) {
      throw new CustomError(`Please enter job description.`, 400);
    }
    if (!location) {
      throw new CustomError(`Please enter job location.`, 400);
    }
    if (!companyName) {
      throw new CustomError(`Please enter Company Name.`, 400);
    }
    if (!category) {
      throw new CustomError(`Please select Category.`, 400);
    }

    const fetchCategory = await Category.findById(category);
    if (!fetchCategory) {
      throw new CustomError(`Category not found`, 400);
    }

    const featured = await featuredJob.create({
      title,
      companyName,
      description,
      location,
      salary,
      jobType,
      contactEmail,
      postedBy,
      category,
    });

    res.status(201).json({
      message: `New Job Successfully Posted.`,
      data: featured,
    });
  } catch (err) {
    next(err);
  }
};

export const getFeaturedJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const featured = await featuredJob.find().populate('category')

    res.status(200).json({
      message: `Featured Jobs Successfully Fetched.`,
      data: featured,
    });
  } catch (err) {
    next(err);
  }
};


