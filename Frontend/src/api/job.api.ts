import api from './index'

export const getAllJobsAPI = async()=>{
  try{
  const response = await api.get('/jobs')
  return response.data
  }catch(err:any){
    throw err.response.data
  }
}