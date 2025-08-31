import { ILoginData } from '../types/auth.types';
import api from './index';
// import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL

export const loginAPI = async(data:ILoginData)=>{
  try{
    console.log(API_URL)
    const response = await api.post('/login',data)
    console.log(response)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}