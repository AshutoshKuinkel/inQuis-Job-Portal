import { ICategory } from "./category.types";

export interface IJob{
  _id:string
  title:string,
  companyName:string,
  description:string,
  location:string,
  salary:string,
  jobType:string,
  category:ICategory
  isFeatured:boolean
  createdAt?:string
}