import mongoose from 'mongoose';
import { Role } from '../types/enum.types';

const userSchema = new mongoose.Schema({
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
    default:Role.SEEKER
  },

  first_name:{
    type:String,
    required:true,
  },

  last_name:{
    type:String,
    required:true,
  },

  seekerResume:{
    type:String,
  },

  companyName:{
    type:String
  },

},{timestamps:true})

export const User = mongoose.model('User',userSchema)