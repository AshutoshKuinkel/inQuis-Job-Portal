import { ILoginData, ISignupData } from '../types/auth.types';
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

export const signupAPI = async(data:ISignupData)=>{
  try{
    console.log(API_URL)
    const response = await api.post('/signup',data)
    console.log(response)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}


export const logoutAPI = async()=>{
  try{
    const response = await api.post('/logout')
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const getProfile = async()=>{
  try{
    const response = await api.get('/me')
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}