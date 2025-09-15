
import axios from 'axios'
import { IProfileData } from '../types/user.types'
import api from './'
import { IApplicationResponse } from '../types/application.types'

export const updateUserProfile = async(data:IProfileData)=>{
  try{
    const response = await api.put('/user/updateProfile',data)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const viewMyApplicationsAPI = async(currentPage:number)=>{
  try{
    const response = await api.get(`/jobs/myApplications?currentPage=${currentPage}`)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const getApplicationByIdAPI = async(id:string) =>{
  try{
    const response = await axios.get(`https://inquis-portal.onrender.com/jobs/myApplications/${id}`,{
      withCredentials:true
    })
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const updateApplicationAPI = async(id:string,data:IApplicationResponse) =>{
  try{
    const response = await api.put(`/jobs/updateApplication/${id}`,data)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}


export const withdrawApplicationAPI = async(id:string) =>{
  try{
    const response = await api.delete(`/jobs/withdrawApplication/${id}`)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}