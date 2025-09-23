import { ICreateJob } from "../types/employer/create-job"
import { IProfileData } from "../types/user.types"
import api from './'


export const updateEmployerProfileAPI = async(data:IProfileData)=>{
  try{
    const response = await api.put('/user/updateEmployerProfile',data)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const createJobAPI = async(data:ICreateJob)=>{
  try{
    const response = await api.post('/employer/createJob',data)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const getMyJobsAPI = async(currentPage:number)=>{
  try{
    const response = await api.get(`/employer/myJobs?currentPage=${currentPage}`)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const viewApplicantsforJobAPI = async(jobId:string)=>{
  try{
    const response = await api.get(`/jobs/applications/${jobId}`)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}