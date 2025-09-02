import { ICategory } from "./category.types";

export interface IJob{
  title:string,
  companyName:string,
  description:string,
  location:string,
  salary:string,
  jobType:string,
  category:ICategory
}