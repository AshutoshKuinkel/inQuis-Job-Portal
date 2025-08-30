import { ILoginData } from '../types/auth.types';
import api from './index';

const API_URL = import.meta.env.VITE_API_BASE_URL

export const loginAPI = async(data:ILoginData)=>{
  try{
    console.log(data,API_URL)
    const response = await api.post('/login',data)
    console.log(response)
    return response.data
  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}