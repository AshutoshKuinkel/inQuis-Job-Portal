import api from './index'

export const getAllJobsAPI = async(currentPage:any)=>{
  try{
  const response = await api.get(`/jobs?currentPage=${currentPage}`)
  return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const getJobBYIdAPI = async(id:string)=>{
  try{
    const response = await api.get(`/jobs/${id}`)
    return response.data
  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}