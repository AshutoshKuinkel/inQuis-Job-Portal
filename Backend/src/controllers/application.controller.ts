import { Request, Response, NextFunction, application } from "express";
import { Application } from "../models/application.model";
import CustomError from "../middlewares/error-handler.middleware";
import { Job } from "../models/job.model";
import { getPagination } from "../utils/pagination.utils";
import { deleteFiles, uploadFile } from "../utils/cloudinary-service.utils";
import { sendEmail } from "../utils/nodemailer.utils";
import {
  generate_confirmation_email,
  generate_employer_application_email,
  generate_status_update_email,
} from "../utils/email.utils";

const folder_name = "/documents";

//Also implement node mailer so when user applies to a job they get an email,
//and when employer changes status, the applicant also gets notified.
export const apply = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      throw new CustomError(`Job not found`, 404);
    }
    const {
      firstName,
      lastName,
      contactEmail,
      phoneNumber,
      linkedinProfile,
      relevantExperience,
      coverLetter,
      availability,
    } = req.body;

    if (!contactEmail) {
      throw new CustomError("Contact email required.", 400);
    }
    if (!firstName) {
      throw new CustomError("First Name required.", 400);
    }
    if (!lastName) {
      throw new CustomError("Last Name required.", 400);
    }
    if (!phoneNumber) {
      throw new CustomError("Phone Number required.", 400);
    }
    if (!relevantExperience) {
      throw new CustomError("Relevant Experience required.", 400);
    }
    if (!coverLetter) {
      throw new CustomError("Cover Letter required.", 400);
    }
    if (!availability) {
      throw new CustomError("Availability required.", 400);
    }
    // if(!resume){
    //   throw new CustomError('Resume required.',400)
    // }

    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });
    if (existing)
      throw new CustomError("You have already applied to this job.", 400);

    // Multer files
    const files = req.files as {
      resume?: Express.Multer.File[];
      coverLetter?: Express.Multer.File[];
    };

    if (!files?.resume?.[0]) {
      throw new CustomError("Resume file is required", 400);
    }

    // Upload resume
    const { path: resumeUrl, public_id: resumeId } = await uploadFile(
      files.resume[0].path,
      folder_name
    );

    const application = new Application({
      job: jobId,
      firstName,
      lastName,
      contactEmail,
      phoneNumber,
      linkedinProfile,
      relevantExperience,
      coverLetter,
      availability,
      resume: { path: resumeUrl, public_id: resumeId },
      applicant: req.user._id,
    });

    await application.save();
    const user = req.user;

    //sending email to let user know they've applied:
    await sendEmail({
      to: `${application.contactEmail}`,
      subject: `Application to ${job?.title || "Job"} at ${
        job?.companyName || "Company"
      }.`,
      html: generate_confirmation_email(application, job, user),
    });

    //sending email to employer aswell to let them know they have a new application:
    await sendEmail({
      to: `${job.contactEmail}`,
      subject: `New Application Received to ${job?.title || "Job"} position.`,
      html: generate_employer_application_email(application, job),
    });

    res.status(201).json({
      message: `Successfully applied!`,
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

export const viewApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user._id;

    const application = await Application.findById(id);
    if (!application) {
      throw new CustomError(`We couldn't find that Application`, 404);
    }
    if (user.toString() !== application.applicant.toString()) {
      throw new CustomError(`Unauthorised. Access Denied`, 403);
    }

    res.status(200).json({
      message: `Application fetched.`,
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

//view applications for job seekers.
export const viewMyApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPage, perPage } = req.query;
    const applicant = req.user._id;

    const page = Number(currentPage) || 1;
    const limit = Number(perPage) || 5;
    const skip = Number(page - 1) * limit;

    console.log("applicant id:", applicant);
    const applications = await Application.find({ applicant })
      .populate("job")
      .limit(limit)
      .skip(skip);

    const total = await Application.countDocuments({ applicant });

    const pagination = getPagination(total, page, limit);

    res.status(201).json({
      message: `Applications successfully fetched`,
      data: applications,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

//update application for job seekers.
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      throw new CustomError(`Job not found`, 404);
    }

    const {
      deletedFile,
      firstName,
      lastName,
      contactEmail,
      phoneNumber,
      linkedinProfile,
      relevantExperience,
      coverLetter,
      availability,
    } = req.body;

    const resume = (
      req.files as {
        [fieldname: string]: Express.Multer.File[];
      }
    )?.resume;

    let deletedFiles: string[] = [];
    if (deletedFile) {
      try {
        deletedFiles = JSON.parse(deletedFile);
      } catch {
        throw new CustomError(
          "Invalid format for deletedFile. Expected JSON array.",
          400
        );
      }
    }

    const fetchApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    let application;

    if (fetchApplication) {
      application = await Application.findByIdAndUpdate(
        fetchApplication._id,
        {
          firstName,
          lastName,
          contactEmail,
          phoneNumber,
          linkedinProfile,
          relevantExperience,
          coverLetter,
          availability,
        },
        { new: true, runValidators: true }
      ).populate("job");
    } else {
      throw new CustomError(
        `Cannot update info for a job you haven't applied to.`,
        400
      );
    }

    if (!application) {
      throw new CustomError(`Nothing to update`, 400);
    }

    // Delete files if requested
    if (deletedFiles.includes("resume") && application.resume?.public_id) {
      await deleteFiles([application.resume.public_id]);
      application.resume = undefined;
    }

    if (resume) {
      const { path, public_id } = await uploadFile(resume[0].path, folder_name);
      if (application.resume) {
        await deleteFiles([application.resume.public_id]);
      }
      application.resume = {
        path,
        public_id,
      };
    }

    await application.save();

    res.status(200).json({
      message: `Application Successfully updated!`,
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

//withdraw application for job seekers.
export const withdraw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      throw new CustomError(`Job not found`, 404);
    }

    const deletedApplication = await Application.findOneAndDelete({
      job: jobId,
      applicant: req.user._id,
    });

    if (!deletedApplication) {
      throw new CustomError(`You haven't applied to this job.`, 404);
    }

    if (deletedApplication.resume) {
      await deleteFiles([deletedApplication.resume.public_id]);
    }

    res.status(200).json({
      message: `Application successfully withdrawn`,
      data: deletedApplication,
    });
  } catch (err) {
    next(err);
  }
};

//view all applications for employers & give option to choose rejected or accepted.

export const viewApplicants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPage, perPage } = req.query;
    const { jobId } = req.params;

    const page = Number(currentPage) || 1;
    const limit = Number(perPage) || 5;
    const skip = Number(page - 1) * limit;

    const job = await Job.findById(jobId);

    if (!job) {
      throw new CustomError(`Job not found`, 404);
    }

    if (req.user._id.toString() !== job.postedBy.toString()) {
      throw new CustomError(`Unauthorized. Access Denied.`, 403);
    }

    const applications = await Application.find({ job: jobId })
      .limit(limit)
      .skip(skip);

    const total = await Application.countDocuments({ job: jobId });

    const pagination = getPagination(total, page, limit);

    res.status(200).json({
      message: `Applications fetched.`,
      data: applications,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPage} = req.query;
    const employerId = req.user._id;

    const page = Number(currentPage) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    // Find all jobs posted by the employer
    const jobs = await Job.find({ postedBy: employerId });

    if (jobs.length === 0) {
      throw new CustomError("No jobs found.", 404);
    }

    // The { $in: jobs.map((job) => job._id) } is going through each job posted by the employer and passing the id...
    //E.g if employer has 3 jobs, it's saying all jobs {$in:['jobId1','jobId2','jobId3']}.
    const applications = await Application.find({
      job: { $in: jobs.map((job) => job._id) },
    })
      .populate("job")
      .limit(limit)
      .skip(skip);

    const total = await Application.countDocuments({
      job: { $in: jobs.map((job) => job._id) },
    });

    const pagination = getPagination(total, page, limit);

    res.status(200).json({
      message: `Applications fetched successfully.`,
      data: applications,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const getApplicationStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employerId = req.user._id;

    // Find all jobs posted by the employer
    const jobs = await Job.find({ postedBy: employerId });

    if (jobs.length === 0) {
      throw new CustomError("No jobs found.", 404);
    }

    // The { $in: jobs.map((job) => job._id) } is going through each job posted by the employer and passing the id...
    //E.g if employer has 3 jobs, it's saying all jobs {$in:['jobId1','jobId2','jobId3']}.
    const applications = await Application.find({
      job: { $in: jobs.map((job) => job._id) },
    })
      .populate("job")


    res.status(200).json({
      message: `Applications fetched successfully.`,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};

export const getRecentApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPage} = req.query;
    const employerId = req.user._id;

    const page = 1;
    const limit = 3;
    const skip = (page - 1) * limit;

    // Find all jobs posted by the employer
    const jobs = await Job.find({ postedBy: employerId });

    if (jobs.length === 0) {
      throw new CustomError("No jobs found.", 404);
    }

    // The { $in: jobs.map((job) => job._id) } is going through each job posted by the employer and passing the id...
    //E.g if employer has 3 jobs, it's saying all jobs {$in:['jobId1','jobId2','jobId3']}.
    const applications = await Application.find({
      job: { $in: jobs.map((job) => job._id) },
    })
      .populate("job")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Application.countDocuments({
      job: { $in: jobs.map((job) => job._id) },
    });

    const pagination = getPagination(total, page, limit);

    res.status(200).json({
      message: `Recent Applications fetched successfully.`,
      data: applications,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { applicationId, jobId } = req.params;
    const { status } = req.body;
    const user = req.user;

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      throw new CustomError(
        "Invalid status. Please enter exactly ACCEPTED or REJECTED.",
        400
      );
    }

    // Find job for authorization
    const job = await Job.findById(jobId);
    if (!job) {
      throw new CustomError("Job not found", 404);
    }

    if (req.user._id.toString() !== job.postedBy.toString()) {
      throw new CustomError("Unauthorized. Access Denied.", 403);
    }

    // Update application directly
    const application = await Application.findOneAndUpdate(
      { _id: applicationId, job: jobId }, // ensures the app belongs to the job
      { status },
      { new: true } // return updated doc
    );

    if (!application) {
      throw new CustomError("Application not found for this job", 404);
    }

    //generating email for seeker:
    await sendEmail({
      to: application.contactEmail,
      subject: `Your application for ${job.title} at ${job.companyName} has been updated`,
      html: generate_status_update_email(application, job, user),
    });

    res.status(200).json({
      message: `Application status updated to ${status}.`,
      data: application,
    });
  } catch (err) {
    next(err);
  }
};
