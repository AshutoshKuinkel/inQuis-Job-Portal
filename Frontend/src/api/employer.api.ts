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