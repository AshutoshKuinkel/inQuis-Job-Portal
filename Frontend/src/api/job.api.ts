import api from './index'

export const getAllJobsAPI = async(currentPage:any,query:string,location:string,sortBy?:string,isFeatured?:boolean)=>{
  try{
  const response = await api.get(`/jobs`,{
    params:{
      currentPage,
      query,
      location,
      sortBy,
      isFeatured
    }
  })
  return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const getJobBYIdAPI = async(id:string,currentPage:any,query:string,location:string)=>{
  try{
    const response = await api.get(`/jobs/${id}`,{
      params:{
        currentPage,
        query,
        location
      }
    })
    return response.data
  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}

export const assessResumeAPI = async(jobId:string,formdata:any)=>{
  try{
    const response = await api.post(`employer/assessResume/${jobId}`,formdata)
    return response.data
  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}

