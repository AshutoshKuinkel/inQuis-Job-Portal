import { IApplicationData } from '../types/application.types'
import api from './'

export const applicationAPI = async(data:IApplicationData)=>{
  try{
    const response = await api.post('/jobs/apply',data)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}