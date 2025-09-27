import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import multer from "multer";
import { Request, Response, NextFunction } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import { Job } from "../models/job.model";
import { getPagination } from "../utils/pagination.utils";
import { Category } from "../models/category.model";

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;

    if (!id) {
      throw new CustomError(`401 code 2`, 401);
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
    const isFeatured = false;
    console.log("JobType received:", jobType);

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

    let job = await Job.create({
      title,
      companyName,
      description,
      location,
      salary,
      jobType,
      contactEmail,
      postedBy,
      category,
      isFeatured,
    });

    job = await job.populate("category");

    res.status(201).json({
      message: `New Job Successfully Posted.`,
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

export const readJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    const { jobId } = req.params;

    if (!id) {
      throw new CustomError(`401 code 3`, 401);
    }

    const job = await Job.findById(jobId).populate("category");

    if (!job) {
      throw new CustomError(`A Job with that Id does not exist.`, 404);
    }

    if (id.toString() !== job.postedBy.toString()) {
      throw new CustomError(`Unauthorized. Access denied.`, 403);
    }

    res.status(200).json({
      message: `Job Successfully Fetched.`,
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

//pagination successfully added.
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    const { currentPage } = req.query;

    const page = Number(currentPage) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;

    if (!id) {
      throw new CustomError(`User id not found.`, 401);
    }

    const jobs = await Job.find({ postedBy: id })
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Job.countDocuments({ postedBy: id });

    const pagination = getPagination(total, page, limit);

    res.status(200).json({
      message: `Jobs Successfully Fetched.`,
      data: jobs,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      throw new CustomError(`No Job exists with that id.`, 400);
    }

    if (id.toString() !== job.postedBy.toString()) {
      throw new CustomError(`Unauthorized. Access Denied.`, 403);
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new CustomError("Nothing to update.", 400);
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

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title: title,
        companyName: companyName,
        description: description,
        location: location,
        salary: salary,
        contactEmail: contactEmail,
        jobType: jobType,
        category: category,
      },
      { new: true, runValidators: true }
    ).populate("category");

    res.status(200).json({
      message: `Job Successfully updated.`,
      data: updatedJob,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      throw new CustomError(`No Job exists with that id.`, 400);
    }

    if (id.toString() !== job.postedBy.toString()) {
      throw new CustomError(`Unauthorized. Access Denied.`, 403);
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);

    res.status(200).json({
      message: `Job successfully deleted.`,
      data: deletedJob,
    });
  } catch (err) {
    next(err);
  }
};

//Public Job Listing API.

//{This allows users to view jobs without being logged in. So no auth func call needed.}
//{This part will be featured on the home page aswell.}
//{Even though it will be featured on the home page, make sure we have a site/jobs route.}
//{Maybe display like 10 jobs titled Our Employers are searching, check if you have what it takes to land some new roles on home page,
//and then we have a continue searching button that guides users to /jobs route.}
//maybe change this to text later instead of $regex if needed.

export const listJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      currentPage,
      query,
      location, //This is for the filtering
      sortBy, //This is for sorting
    } = req.query;

    let filter: Record<string, any> = {};

    const page = Number(currentPage) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    if (query) {
      filter.$or = [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },

        {
          description: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (req.query.isFeatured) {
      const isFeatured = req.query.isFeatured === "true";
      filter.isFeatured = isFeatured;
    }

    let sortOption = {};

    switch (sortBy) {
      case "latest":
        sortOption = { createdAt: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "highestSalary":
        sortOption = { salary: -1 };
        break;
      case "lowestSalary":
        sortOption = { salary: 1 };
        break;
    }

    if (!sortOption) {
      sortOption = { createdAt: -1 };
    }

    let jobs = await Job.find(filter)
      .sort(sortOption)
      .limit(limit)
      .skip(skip)
      .populate("category");

    let total = await Job.countDocuments(filter);

    if (jobs.length === 0) {
      jobs = await Job.find({})
        .sort(sortOption)
        .limit(limit)
        .skip(skip)
        .populate("category");

      total = await Job.countDocuments({});
    }

    const pagination = getPagination(total, page, limit);

    res.status(200).json({
      message: `All Jobs Fetched Successfully.`,
      data: jobs,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

// get jobs by category
export const getJobByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // categoryId
    const { currentPage } = req.query;

    const page = Number(currentPage) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    // check if category exists
    const category = await Category.findById(id);
    if (!category) {
      throw new CustomError(`Category not found`, 404);
    }
    const total = await Job.countDocuments({ category: id });
    const totalPages = Math.ceil(total / limit);

    if (page > totalPages && totalPages !== 0) {
      throw new CustomError(`Page out of range`, 400);
    }

    // get jobs with pagination
    const jobs = await Job.find({ category: id })
      .populate("category")
      .skip(skip)
      .limit(limit);

    if (!jobs || jobs.length === 0) {
      throw new CustomError(`No Jobs found for this category`, 404);
    }

    const pagination = getPagination(total, page, limit);

    res.status(200).json({
      message: `Jobs from category fetched successfully`,
      data: jobs,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

//get job by id:

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate("category");
    if (!job) {
      throw new CustomError(`Job not Found`, 404);
    }

    res.status(200).json({
      message: `Job Successfully fetched.`,
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

//resume scorer:
export const resumeScorer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobId = req.params.jobId;
    const filePath = req.file?.path;

    if (!filePath) {
      throw new CustomError(`No resume file found`, 404);
    }

    const job = await Job.findById(jobId);
    if (!job) {
      throw new CustomError(`Job not found`, 404);
    }

    const form = new FormData();
    form.append("resume_file", fs.createReadStream(filePath));
    form.append("job_description", job.description);

    const fastAPIResponse = await axios.post(
      "https://AKuinkel-demo-app.hf.space/similarity",
      form,
      {
        headers: form.getHeaders(),
      }
    );

    fs.unlinkSync(filePath);

    res.status(200).json({
      score: fastAPIResponse.data.score,
      tips: fastAPIResponse.data.tips.split("\n").filter(Boolean),
    });
  } catch (err) {
    next(err);
  }
};
