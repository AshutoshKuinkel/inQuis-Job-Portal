import { IJWTDecodedPayload, IJWTPayload } from './../types/global.types';
import  dotenv  from 'dotenv';
dotenv.config()
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET ?? ''
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN ?? ''

export const generateAccessToken = (IJWTPayload:any)=>{
  return jwt.sign(IJWTPayload,JWT_SECRET,{expiresIn: JWT_EXPIRE_IN as any})
}

export const verifyAccessToken = (token:string):IJWTDecodedPayload=>{
  return jwt.verify(token,JWT_SECRET) as IJWTDecodedPayload
}