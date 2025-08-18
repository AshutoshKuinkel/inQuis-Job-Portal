import mongoose from "mongoose";
import { job_type } from "../types/enum.types";

const jobSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,`A title for your job is required.`]
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
    type:Number,
  },

  jobType:{
    type:String,
    enum:Object.values(job_type),
    default:job_type.FULL_TIME
  },

  postedBy:{
    type:mongoose.Types.ObjectId,
    required:[true,`Reference to employer user ID not found`]
  }
},{timestamps:true})

// Create indexes
jobSchema.index({ location: 1 });    // ascending index on location
jobSchema.index({ createdAt: -1 });  // descending index on createdAt for latest first sorting
jobSchema.index({ salary: -1 });     // descending index on salary for highest salary sorting

export const Job = mongoose.model('Job',jobSchema)

//just build the CRUD for this API now.