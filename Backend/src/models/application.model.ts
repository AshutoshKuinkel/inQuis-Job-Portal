import mongoose from "mongoose";
import { applicationStatus} from "../types/enum.types";

const applicationSchema = new mongoose.Schema({
  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Job',
    required:[true,`Please select a job to apply for.`]
  },

  contactEmail:{
    type:String,
    required:[true,`Contact email required.`]
  },

  resume:{
    path:{
      type:String,
      required:true
    },
    public_id:{
      type:String,
      required:true
    }
  },

  coverLetter:{
    path:{
      type:String,
      required:true
    },
    public_id:{
      type:String,
      required:true
    }
  },

  status:{
    type:String,
    enum:Object.values(applicationStatus),
    default: applicationStatus.PENDING
  },

  applicant:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
},{timestamps:true})

export const Application = mongoose.model(`Application`,applicationSchema)