import mongoose from 'mongoose';
import { Role } from '../types/enum.types';

const employerRegisterationSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:[true,`This email is already associated with an account. Please Log In instead.`]
  },

  password:{
    type:String,
    required:true,
    select:false,
  },

  role:{
    type:String,
    enum:Object.values(Role),
    default:Role.EMPLOYER
  },

  first_name:{
    type:String,
    required:true,
  },

  last_name:{
    type:String,
    required:true,
  },

},{timestamps:true})

export const Employer = mongoose.model('Employer',employerRegisterationSchema)