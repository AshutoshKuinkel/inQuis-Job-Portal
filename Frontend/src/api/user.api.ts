import { IProfileData } from '../types/user.types'
import api from './'

export const updateUserProfile = async(data:IProfileData)=>{
  try{
    const response = await api.put('/user/updateProfile',data)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}