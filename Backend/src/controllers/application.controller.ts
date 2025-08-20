
import { Request,Response,NextFunction} from "express";
import { Application } from "../models/application.model";
import CustomError from "../middlewares/error-handler.middleware";
import { Job } from "../models/job.model";
import { getPagination } from "../utils/pagination.utils";
import { uploadFile } from "../utils/cloudinary-service.utils";

const folder_name = '/documents'

//Next step: implement file handling to allow users to upload their resume & cv file,
//Also implement node mailer so when user applies to a job they get an email,
//and when employer changes status, the applicant also gets notified.
export const apply = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {jobId} = req.params

    const job = await Job.findById(jobId)

    if(!job){
      throw new CustomError(`Job not found`,404)
    }
    const {contactEmail} = req.body

    if(!contactEmail){
      throw new CustomError('Contact email required.',400)        
    }
    // if(!resume){
    //   throw new CustomError('Resume required.',400)      
    // }

    const existing = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (existing) throw new CustomError("You have already applied to this job.", 400);

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

    // Upload cover letter (optional)
    let coverLetterFile = null;
    if (files?.coverLetter?.[0]) {
      const { path: coverUrl, public_id: coverId } = await uploadFile(
        files.coverLetter[0].path,
        folder_name
      );
      coverLetterFile = { path: coverUrl, public_id: coverId };
    }

    const application = new Application({
      job: jobId,
      contactEmail,
      resume: { path: resumeUrl, public_id: resumeId },
      coverLetter: coverLetterFile,
      applicant: req.user._id
    })

    await application.save()

    res.status(201).json({
      message: `Successfully applied!`,
      data:application
    })

  }catch(err){
  next(err)
  }
}

//view applications for job seekers.
export const viewMyApplications = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {currentPage,perPage} = req.query

    const page = Number(currentPage) || 1
    const limit = Number(perPage) || 5
    const skip = Number(page-1) * limit

    const applications = await Application.find({applicant:req.user._id}).populate('job')
    .limit(limit)
    .skip(skip)

    const total = await Application.countDocuments()

    const pagination = getPagination(total,page,limit)

    res.status(201).json({
      message: `Applications successfully fetched`,
      data:applications,pagination
    })

  }catch(err){
  next(err)
  }
}


//update application for job seekers.
export const update = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {jobId} = req.params

    const job = await Job.findById(jobId)

    if(!job){
      throw new CustomError(`Job not found`,404)
    }

    const {contactEmail,resume,coverLetter} = req.body

    const fetchApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id
    }) 

    let newApplication;

    if(fetchApplication){
      newApplication = await Application.findByIdAndUpdate(
        fetchApplication._id,
        {
          contactEmail,
          resume,
          coverLetter
        },
        {new:true, runValidators:true}
      ).populate('job')
    } else{
      throw new CustomError(`Cannot update info for a job you haven't applied to.`,400)
    }

    res.status(201).json({
      message: `Application Successfully updated!`,
      data:newApplication
    })

  }catch(err){
  next(err)
  }
}


//withdraw application for job seekers.
export const withdraw = async(req:Request,res:Response,next:NextFunction)=>{
  try{

    const {jobId} = req.params

    const job = await Job.findById(jobId)

    if(!job){
      throw new CustomError(`Job not found`,404)
    }

    const deletedApplication = await Application.findOneAndDelete({
      job:jobId,
      applicant: req.user._id
    })

    if(!deletedApplication){
      throw new CustomError(`You haven't applied to this job.`, 404)
    }

    res.status(200).json({
      message:`Application successfully withdrawn`,
      data:deletedApplication
    })

  }catch(err){
    next(err)
  }
}


//view all applications for employers & give option to choose rejected or accepted.

export const viewApplicants = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    
    const {currentPage,perPage} = req.query
    const {jobId} = req.params


    const page = Number(currentPage) || 1
    const limit = Number(perPage) || 5
    const skip = Number(page-1) * limit

    const job = await Job.findById(jobId)

    if(!job){
      throw new CustomError(`Job not found`,404)
    }

    if(req.user._id.toString() !== job.postedBy.toString()){
      throw new CustomError(`Unauthorized. Access Denied.`,403)
    }

    const applications = await Application.find({job:jobId})
    .limit(limit)
    .skip(skip)

    const total = await Application.countDocuments({job:jobId})

    const pagination = getPagination(total,page,limit)

    res.status(200).json({
      message: `Applications fetched.`,
      data: applications,pagination
    })
  }catch(err){
    next(err)
  }
}

export const updateApplicationStatus = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const { applicationId, jobId } = req.params;
    const { status } = req.body;

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      throw new CustomError("Invalid status. Please enter exactly ACCEPTED or REJECTED.",400);
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

    res.status(200).json({
      message: `Application status updated to ${status}.`,
      data: application,
    });
  } catch (err) {
    next(err);
  }
};
