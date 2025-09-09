import mongoose from "mongoose";
import { applicationStatus} from "../types/enum.types";

const applicationSchema = new mongoose.Schema({
  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Job',
    required:[true,`Please select a job to apply for.`]
  },

  firstName:{
    type:String,
    required:[true,'First Name is required.']
  },

  lastName:{
    type:String,
    required:[true,'First Name is required.']
  },

  contactEmail:{
    type:String,
    required:[true,`Contact email required.`]
  },

  phoneNumber:{
    type:String,
    required:[true,'Phone Number is required.']
  },

  linkedinProfile:{
    type:String,
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

  relevantExperience:{
    type:String,
    required:[true,'First Name is required.']
  }, 

  coverLetter:{
    type:String,
    required:[true,`Cover Letter is required.`]
  },

  availability:{
    type:String,
    required:[true,`Availability is required.`]
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