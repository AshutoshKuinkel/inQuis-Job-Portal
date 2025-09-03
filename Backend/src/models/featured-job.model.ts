import mongoose from "mongoose";
import { categories, job_type } from "../types/enum.types";
import { ref } from "process";

const featuredJobSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,`A title for your job is required.`]
  },

  companyName:{
    type:String,
    required:[true,`A company name for job is required.`]
  },

  description:{
    type:String,
    required:[true,`Please enter a job description.`]
  },

  location:{
    type:String,
    required:[true,'Please set a location for your job.']
  },

  salary:{
    type:String,
  },

  jobType:{
    type:String,
    enum:Object.values(job_type),
    default:job_type.FULL_TIME
  },

  contactEmail:{
    type:String,
    required:[true,'Please set a contact email to receive updates about your job posting.']
  },

  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required: [true,'Please select a category for your job, or one that best matches.'],
  },

  postedBy:{
    type:mongoose.Types.ObjectId,
    required:[true,`Reference to employer user ID not found`]
  }
},{timestamps:true})

export const featuredJob = mongoose.model('featuredJob',featuredJobSchema)