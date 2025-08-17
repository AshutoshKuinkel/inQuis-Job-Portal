import {Request, Response, NextFunction} from 'express';
import CustomError from '../middlewares/error-handler.middleware';
import { Job } from '../models/job.model';
import { getPagination } from '../utils/pagination.utils';

//next step: add pagination to jobs list.

export const createJob = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id

    if(!id){
      throw new CustomError(`Unauthorized. Access denied.`,401)
    }

    const {title,description,location,salary,jobType} = req.body
    const postedBy = id

    if(!title){
      throw new CustomError(`Please enter job title.`,400)
    }
     if(!description){
      throw new CustomError(`Please enter job description.`,400)
    }
     if(!location){
      throw new CustomError(`Please enter job location.`,400)
    }

    const job = await Job.create({title,description,location,salary,jobType,postedBy})

    res.status(201).json({
      message: `New Job Successfully Posted.`,
      data:job
    })
  }catch(err){
    next(err)
  }
}


export const readJob = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id
    const {jobId} = req.params

    if(!id){
      throw new CustomError(`Unauthorized. Access denied.`,401)
    }

    const job = await Job.findById(jobId)

    if(!job){
      throw new CustomError(`A Job with that Id does not exist.`,404)
    }

    if(id.toString() !== job.postedBy.toString()){
      throw new CustomError(`Unauthorized. Access denied.`,403)
    }

    res.status(200).json({
      message: `Job Successfully Fetched.`,
      data:job
    })
  }catch(err){
    next(err)
  }
}

//pagination successfully added.
export const getAllJobs = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id
    const {currentPage,perPage} = req.query

    const page = Number(currentPage) || 1
    const limit = Number(perPage) || 10
    const skip = (page-1) * limit

    if(!id){
      throw new CustomError(`Unauthorized. Access denied.`,401)
    }

    const jobs = await Job.find({postedBy:id}).sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)

    const total = await Job.countDocuments({ postedBy: id })

    const pagination = getPagination(total,page,limit)


    res.status(200).json({
      message: `Jobs Successfully Fetched.`,
      data:jobs
      ,pagination
    })
  }catch(err){
    next(err)
  }
}

export const updateJob = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id
    const {jobId} = req.params

    const job = await Job.findById(jobId)

    if(!job){
      throw new CustomError(`No Job exists with that id.`,400)
    }

    if(id.toString() !== job.postedBy.toString()){
      throw new CustomError(`Unauthorized. Access Denied.`,403)
    }

    const {title,description,location,salary,jobType} = req.body

    if (!title && !description && !location && !salary && !jobType) {
      throw new CustomError('Nothing to update.', 400);
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {title:title,description:description,location:location,salary:salary,jobType:jobType},
      {new:true,runValidators:true}
    )


    res.status(200).json({
      message: `Job Successfully updated.`,
      data:updatedJob
    })
  }catch(err){
    next(err)
  }
}

export const deleteJob = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id
    const {jobId} = req.params

    const job = await Job.findById(jobId)

    if(!job){
      throw new CustomError(`No Job exists with that id.`,400)
    }

    if(id.toString() !== job.postedBy.toString()){
      throw new CustomError(`Unauthorized. Access Denied.`,403)
    }

    const deletedJob = await Job.findByIdAndDelete(jobId)

    res.status(200).json({
      message: `Job successfully deleted.`,
      data:deletedJob
    })
  }catch(err){
    next(err)
  }
}



