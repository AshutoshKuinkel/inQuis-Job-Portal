import { Category } from "../models/category.model";
import CustomError from "../middlewares/error-handler.middleware";
import { NextFunction, Request, Response } from "express";



export const createCategory = async(req:Request,res:Response,next:NextFunction)=>{
  try{
      const {name} = req.body

      if(!name){
        throw new CustomError(`Please Select Name for Category.`,400)
      }

      const category = await Category.create({name})

      res.status(201).json({
        message:`Category Successfully Added.`,
        data:category
      })
    
  }catch(err){
    next(err)
  }
}
export const fetchCategories = async(req:Request,res:Response,next:NextFunction)=>{
  try{

      const category = await Category.find()

      if(!category){
        throw new CustomError('No Categories Registered yet. Please Add some to View.',400)
      }

      res.status(201).json({
        message:`Categories Fetched.`,
        data:category
      })
    
  }catch(err){
    next(err)
  }
}