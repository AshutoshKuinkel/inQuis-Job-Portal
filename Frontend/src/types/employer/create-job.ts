import { ICategory } from "../category.types"

export interface ICreateJob{
    title:string,
    companyName:string,
    description:string,
    location:string,
    salary:string,
    jobType?:string | undefined,
    contactEmail:string
    category:string | ICategory
    isFeatured?:boolean
}