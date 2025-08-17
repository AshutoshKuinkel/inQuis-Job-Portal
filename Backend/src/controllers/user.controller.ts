import { Request,Response,NextFunction } from "express";
import mongoose from "mongoose";
import CustomError from "../middlewares/error-handler.middleware";
import { User } from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.utils";

//later on after building this controller, change the data to send the stuff we want the user to see only.
//we don't really need to show the id of the user to the user, role, updated at.
export const viewProfile = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id

    const user = await User.findById(id)

    if(!user){
      throw new CustomError(`Unauthorised. Access Denied.`,400)
    }

    res.status(200).json({
      message:`User profile successfully loaded`,
      data:user
    })
  }catch(err){
    next(err)
  }
}

export const updateSeekerProfile = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    // get the user data through like our view profile, have {input fields} = req.body, if anything is changed set user.{input field} = input field.

    const id = req.user._id

    const user = await User.findById(id)

    if(!user){
      throw new CustomError(`Unauthorised. Access Denied.`,400)
    }

    const {email,password,first_name,last_name,seekerResume} = req.body
    //The { [key: string]: any } allows for optional extra fields. E.g password etc.
    const updatedData: { [key: string]: any } = {email,first_name,last_name,seekerResume}

    if (email){
      if(3 > email.length || email.length > 50){
      throw new CustomError(`Please enter an email address between 3 & 50 characters.`,400)
    }
    }
    
    if(password){
      if(8>password.length){
      throw new CustomError(`Please enter a password greater than 8 characters.`,400)
    }
    //add password to updated data:
    const hashedPassword = await hashPassword(password)
    updatedData.password = hashedPassword
    }

    const updatedInfo = await User.findByIdAndUpdate(
      id,
      updatedData,
      {new:true, runValidators:true}
    )

    res.status(200).json({
      message:`Profile Info Successfully Updated.`,
      data:updatedInfo
    })
  }catch(err){
    next(err)
  }
}


export const updateEmployerProfile = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id

    const user = await User.findById(id)

    if(!user){
      throw new CustomError(`Unauthorised. Access Denied.`,400)
    }

    const {email,password,first_name,last_name,companyName} = req.body
    //The { [key: string]: any } allows for optional extra fields. E.g password etc.
    const updatedData: { [key: string]: any } = {email,first_name,last_name,companyName}

    if (email){
      if(3 > email.length || email.length > 50){
      throw new CustomError(`Please enter an email address between 3 & 50 characters.`,400)
    }
    }
    
    if(password){
      if(8>password.length){
      throw new CustomError(`Please enter a password greater than 8 characters.`,400)
    }
    //add password to updated data:
    const hashedPassword = await hashPassword(password)
    updatedData.password = hashedPassword
    }

    const updatedInfo = await User.findByIdAndUpdate(
      id,
      updatedData,
      {new:true, runValidators:true}
    )

    res.status(200).json({
      message:`Profile Info Successfully Updated.`,
      data:updatedInfo
    })
  }catch(err){
    next(err)
  }
}