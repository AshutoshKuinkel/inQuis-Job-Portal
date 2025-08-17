import mongoose from "mongoose"
import { Role } from "./enum.types"

export interface IJWTPayload{
  _id: mongoose.Schema.Types.ObjectId
  email:string
  role:Role
  first_name:string,
  last_name:string,
}

export interface IJWTDecodedPayload extends IJWTPayload{
  exp:number
  iat:number
}