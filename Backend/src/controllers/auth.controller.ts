import { IJWTPayload } from './../types/global.types';
import { Request,Response,NextFunction } from "express";
import { User } from "../models/user.model";
import CustomError from "../middlewares/error-handler.middleware";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { Role } from "../types/enum.types";
import { generateAccessToken } from "../utils/jwt.utils";




export const registerUser = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {email,password,first_name,last_name,seekerResume,companyName,role} = req.body

    if(!email){
      throw new CustomError(`Email is required.`,400)
    }
    if(3 > email.length || email.length > 50){
      throw new CustomError(`Please enter an email address between 3 & 50 characters.`,400)
    }
    if(!password){
      throw new CustomError(`Password is required.`,400)
    }
    if(8>password.length){
      throw new CustomError(`Please enter a password greater than 8 characters.`,400)
    }
    if(!first_name){
      throw new CustomError(`First Name is required.`,400)
    }
    if(!last_name){
      throw new CustomError(`Last Name is required.`,400)
    }


    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      email,
      password:hashedPassword,
      first_name,
      last_name,
      role: role === Role.EMPLOYER ? Role.EMPLOYER : undefined,
    })
    await user.save()

    const userObj = user.toObject()
    const {password:pass,...secureUser} = userObj

    res.status(201).json({
      message:`User successfully registered.`,
      data:secureUser
    })

  }catch(err){
    next(err)
  }
}


export const login = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {email,password} = req.body

    if(!email){
      throw new CustomError(`An email is required.`,400)
    }
    if(!password){
      throw new CustomError(`A password is required.`,400)
    }

    const user:any = await User.findOne({email}).select('+password')

    if(!user){
      throw new CustomError(`There seems to be no account registered under that email. Please sign up instead.`,400)
    }

    const isPassMatch = await comparePassword(password,user.password)

    if (!isPassMatch){
      throw new CustomError('Invalid Credentials', 400);
    }

    const payload:IJWTPayload = {
      _id: user._id,
      email:user.email,
      role:user.role,
      first_name:user.first_name,
      last_name:user.last_name
    }

    const inQuis_portal_accessToken = generateAccessToken(payload)

    const userObj = user.toObject()
    const {password:pass,...secureUser} = userObj

    res.cookie('inQuis_portal_accessToken',inQuis_portal_accessToken,{
      httpOnly:true,
      secure: process.env.NODE_ENV==='development' ? false : true,
      maxAge:Number(process.env.COOKIE_EXPIRE_IN) * 24 * 60 * 60 * 1000,
      sameSite:'none'
    })
    .status(200).json({
      message:`Successfully logged in.`,
      data: secureUser,inQuis_portal_accessToken
    })
  }catch(err){
    next(err)
  }
}

export const logout = async(req:Request,res:Response,next:NextFunction)=>{
  try{

    res.clearCookie('inQuis_portal_accessToken',{
        secure:process.env.NODE_ENV === 'development' ? false:true,
        httpOnly:true,
        sameSite:'none'
      })
      .status(200).json({
        message:`Successfully Logged out.`,
        data:null
      })

  }catch(err){
    next(err)
  }
}

//check

export const profile = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id

    const user = await User.findById(id)

    if(!user){
      throw new CustomError(`User fetch Error.`,400)
    }

    res.status(200).json({
      message:'Profile fetched.',
      data:user
    })
  }catch(err){
    next(err)
  }
}



export const registerEmployer = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {email,password,first_name,last_name} = req.body

    if(!email){
      throw new CustomError(`Email is required.`,400)
    }
    if(3 > email.length || email.length > 50){
      throw new CustomError(`Please enter an email address between 3 & 50 characters.`,400)
    }
    if(!password){
      throw new CustomError(`Password is required.`,400)
    }
    if(8>password.length){
      throw new CustomError(`Please enter a password greater than 8 characters.`,400)
    }
    if(!first_name){
      throw new CustomError(`First Name is required.`,400)
    }
    if(!last_name){
      throw new CustomError(`Last Name is required.`,400)
    }


    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      email,
      password:hashedPassword,
      first_name,
      last_name,
      role: Role.EMPLOYER,
    })
    await user.save()

    const userObj = user.toObject()
    const {password:pass,...secureUser} = userObj

    res.status(201).json({
      message:`User successfully registered.`,
      data:secureUser
    })

  }catch(err){
    next(err)
  }
}
